import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Chat.module.scss';
import { Plus } from '../../assets';
import RightChatBox from '../../components/Chat/RightChatBox';
import ChatHeader from '../../components/common/Header/ChatHeader/ChatHeader';
import AiChatBox from '../../components/Chat/AiChatBox';
import LeftChatBox from '../../components/Chat/LeftChatBox';
import PhotoChatBox from '../../components/Chat/PhotoChatBox';
import LoadingChat from '../../components/Chat/LoadingChat';
import DateSelector from '../../components/common/BottomSheets/DateSelect/DateSelector';
import { formatFullDateToString } from '../../utils/dateFormatters';
import {
  dataUrlToBlob,
  getAiEnglish,
  makeSection,
  resizeImage,
} from '../../utils/chattings';
import { getChatData } from '../../apis/aiChatApi';
import useChatStore from '../../stores/chatStore';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { WS_URL } from '../../apis';
import { getUserId } from '../../utils/user';

const Chat = () => {
  const {
    messages,
    setMessages,
    addPreviousMessage,
    addNextMessage,
    replaceLastMessage,
  } = useChatStore();

  const [inputText, setInputText] = useState('');
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [isGPTLoading, setIsGPTLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    setChatId((prev) => (Number(prev) - 10).toString());
  });

  const target = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem('chatId')) {
      setChatId(localStorage.getItem('chatId'));
    }
    const newSocket = new WebSocket(`${WS_URL}/chatwebsocket`);
    setSocket(newSocket);
    return () => {
      setMessages([]);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (target.current) {
      if (chatId) {
        observe(target.current);
      }
      if (Number(chatId) - 10 < 0) {
        unobserve(target.current);
      }
      if (isLoading) {
        unobserve(target.current);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  useEffect(() => {
    setIsLoading(true);
    const previousScrollHeight = document.body.scrollHeight;

    getChatData((Number(chatId) - 10).toString())
      .then((result) => {
        if (Number(chatId) >= 10) {
          addPreviousMessage(result);
        } else if (Number(chatId) >= 0) {
          addPreviousMessage(result.slice(0, chatId));
        }
      })
      .then(() => {
        const afterScrollHeight = document.body.scrollHeight;
        const offset = afterScrollHeight - previousScrollHeight;
        window.scrollTo(0, offset);
      })
      .then(() => setIsLoading(false));
  }, [chatId]);

  const MessageSections = useMemo(() => {
    if (!messages) return;
    return makeSection(messages || []);
  }, [messages]);

  const onClickSelector = () => {
    setIsSelectedDate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ai = getAiEnglish();
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setIsGPTLoading(true);

      // 이미지 리사이즈 함수 적용
      resizeImage(url, 500, 500, (resizedUrl) => {
        // 콜백 내부에서 메시지 추가와 소켓 전송
        addNextMessage([
          {
            chatId: Date.now(),
            sender: 'USER',
            content: resizedUrl,
            createAt: formatFullDateToString(new Date()),
            chatType: 'IMG',
          },
          {
            chatId: Date.now(),
            sender: ai,
            content: <LoadingChat />,
            createAt: formatFullDateToString(new Date()),
            chatType: 'CHAT',
          },
        ]);

        socket?.send(
          JSON.stringify({
            userId: getUserId(),
            content: resizedUrl,
            selectedModel: localStorage.getItem('currentCharacter') || 1,
            chatType: 'IMG',
          }),
        );
        const blob = dataUrlToBlob(resizedUrl);
        console.log(`Image size: ${(blob.size / 1024).toFixed(2)} KB`);
      });

      setIsGPTLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (isGPTLoading || inputText.trim() === '') return;

    setIsGPTLoading(true);
    const ai = getAiEnglish();
    addNextMessage([
      {
        chatId: Date.now(),
        sender: 'USER',
        content: inputText,
        createAt: formatFullDateToString(new Date()),
        chatType: 'CHAT',
      },
      {
        chatId: Date.now(),
        sender: ai,
        content: <LoadingChat />,
        createAt: formatFullDateToString(new Date()),
        chatType: 'CHAT',
      },
    ]);
    setInputText('');
    socket?.send(
      JSON.stringify({
        userId: getUserId(),
        content: inputText,
        selectedModel: localStorage.getItem('currentCharacter') || 1,
        chatType: 'CHAT',
      }),
    );
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = async (event: MessageEvent) => {
      console.log(event.data);
      // GPT of User message processing error
      if (
        event.data ===
        ('GPT message processing error' || 'User message processing error')
      ) {
        const ai = getAiEnglish();
        const updatedMessage = {
          chatId: Date.now(),
          sender: ai,
          content: '에러가 발생했습니다. 다시 시도해주세요.',
          createAt: formatFullDateToString(new Date()),
          chatType: 'CHAT',
        };
        replaceLastMessage(updatedMessage);
        return;
      }
      // message
      const res = await JSON.parse(event.data);
      // 200, 500
      if (typeof res === 'number') return;

      const updatedMessage = {
        chatId: res.chatId,
        sender: res.sender,
        content: res.content,
        createAt: res.createAt,
        chatType: res.chatType,
      };
      replaceLastMessage(updatedMessage);
      localStorage.setItem('chatId', res.chatId);
      setIsGPTLoading(false);
    };
  }, [socket]);

  return (
    <div>
      <ChatHeader onClick={onClickSelector} />
      <div ref={target}></div>
      <div className={styles.messagesContainer}>
        {Object.entries(MessageSections || {})?.map(([day, messages]) => (
          <>
            <p className={styles.fullDate}>{day}</p>
            {messages.map((m) =>
              m.sender == 'USER' ? (
                m.chatType === 'IMG' ? (
                  <PhotoChatBox url={m.content as string} date={m.createAt} />
                ) : (
                  <RightChatBox date={m.createAt} key={m.chatId}>
                    {m.content}
                  </RightChatBox>
                )
              ) : m.sender == 'SYSTEM' ? (
                <p className={styles.aiChanged}>{m.content}</p>
              ) : (
                <AiChatBox key={m.chatId} ai={m.sender}>
                  <LeftChatBox date={m.createAt}>{m.content}</LeftChatBox>
                </AiChatBox>
              ),
            )}
          </>
        ))}
      </div>
      <div className={styles.inputBox}>
        <button className={styles.plusBtn} onClick={handleAddFileClick}>
          <Plus />
        </button>
        <input
          className={styles.input}
          value={inputText}
          onChange={handleInputChange}
        />
        <button className={styles.submitBtn} onClick={handleSendMessage}>
          전송
        </button>
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.webp"
        className={styles.photoInput}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      {isSelectedDate ? (
        <DateSelector
          clickOuter={setIsSelectedDate}
          isFullDate={true}
          isOpen={isSelectedDate}
          onSelectDate={onClickSelector}
        />
      ) : null}
    </div>
  );
};

export default Chat;
