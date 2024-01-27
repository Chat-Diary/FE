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
import { isImageUrl } from '../../utils/fileFormats';
import {
  IMessage,
  getAiEnglish,
  saveMessagesToLocalStorage,
  makeSection,
} from '../../utils/chattings';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [socket, setSocket] = useState<WebSocket>(
    new WebSocket(`${process.env.REACT_APP_WS_API_KEY}/chatwebsocket`),
  );
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MessageSections = useMemo(() => {
    if (!messages) return;
    return makeSection(messages || []);
  }, [messages]);

  const onSelectDate = () => {
    setIsSelectedDate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });
    socket.addEventListener('close', (event) => {
      console.log(`WebSocket connection closed: ${event.reason}`);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', (event: MessageEvent) => {
      const res = JSON.parse(event.data);
      console.log(res);

      const ai = getAiEnglish();

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          chatId: Date.now(),
          sender: ai,
          content: res.content,
          createdAt: formatFullDateToString(new Date()),
          chatType: 'CHAT',
        };
        saveMessagesToLocalStorage(updatedMessages);
        return updatedMessages;
      });
      setIsLoading(false);
    });
  }, [socket]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ai = getAiEnglish();

    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;

      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          chatId: Date.now(),
          sender: 'user',
          content: url,
          createdAt: formatFullDateToString(new Date()),
          chatType: 'CHAT',
        },
        {
          chatId: Date.now(),
          sender: ai,
          content: <LoadingChat />,
          createdAt: formatFullDateToString(new Date()),
          chatType: 'CHAT',
        },
      ]);
    };
    reader.readAsDataURL(file);
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '' || isLoading) return;

    const ai = getAiEnglish();

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        chatId: Date.now(),
        sender: 'USER',
        content: inputText,
        createdAt: formatFullDateToString(new Date()),
        chatType: 'CHAT',
      },
      {
        chatId: Date.now(),
        sender: ai,
        content: <LoadingChat />,
        createdAt: formatFullDateToString(new Date()),
        chatType: 'CHAT',
      },
    ]);
    setInputText('');
    socket?.send(
      JSON.stringify({
        userId: 1,
        content: inputText,
        selectedModel: localStorage.getItem('currentCharacter'),
        chatType: 'CHAT',
      }),
    );

    setIsLoading(false);
  };

  useEffect(() => {
    const storedChatData = localStorage.getItem('chatData');
    if (storedChatData && JSON.parse(storedChatData).length !== 0) {
      setMessages(JSON.parse(storedChatData));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  return (
    <div>
      <ChatHeader onClick={onSelectDate} />
      <div className={styles.messagesContainer}>
        {Object.entries(MessageSections || {})?.map(([day, messages]) => (
          <>
            <p className={styles.fullDate}>{day}</p>
            {messages.map((m) =>
              m.sender == 'USER' ? (
                isImageUrl(m.content as string) ? (
                  <PhotoChatBox url={m.content as string} date={m.createdAt} />
                ) : (
                  <RightChatBox date={m.createdAt} key={m.chatId}>
                    {m.content}
                  </RightChatBox>
                )
              ) : m.sender == 'SYSTEM' ? (
                <p className={styles.aiChanged}>{m.content}</p>
              ) : (
                <AiChatBox key={m.chatId} ai={m.sender}>
                  <LeftChatBox date={m.createdAt}>{m.content}</LeftChatBox>
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
        accept=".jpg,.jpeg,.png"
        className={styles.photoInput}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      {isSelectedDate ? (
        <DateSelector
          clickOuter={setIsSelectedDate}
          isFullDate={true}
          isOpen={isSelectedDate}
        />
      ) : null}
    </div>
  );
};

export default Chat;
