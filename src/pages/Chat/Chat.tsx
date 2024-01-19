import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Chat.module.scss';
import { Plus } from '../../assets';
import RightChatBox from '../../components/common/RightChatBox';
import ChatHeader from '../../components/Headers/ChatHeader';
import AiChatBox from '../../components/common/AiChatBox';
import LeftChatBox from '../../components/common/LeftChatBox';
import PhotoChatBox from '../../components/common/PhotoChatBox';
import LoadingChat from '../../components/common/LoadingChat';
import DateSelector from '../../components/BottomSheets/DateSelector';
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
  console.log(localStorage.getItem('chatData'));
  const [inputText, setInputText] = useState('');
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          id: Date.now(),
          type: 'user',
          content: url,
          createdAt: formatFullDateToString(new Date()),
        },
        {
          id: Date.now(),
          type: ai,
          content: <LoadingChat />,
          createdAt: formatFullDateToString(new Date()),
        },
      ]);
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      const aiResponse = 'AI 응답';
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          id: Date.now(),
          type: ai,
          content: aiResponse,
          createdAt: formatFullDateToString(new Date()),
        };
        saveMessagesToLocalStorage(updatedMessages);
        return updatedMessages;
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '' || isLoading) return;

    const ai = getAiEnglish();

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        content: inputText,
        createdAt: formatFullDateToString(new Date()),
      },
      {
        id: Date.now(),
        type: ai,
        content: <LoadingChat />,
        createdAt: formatFullDateToString(new Date()),
      },
    ]);
    setInputText('');
    setTimeout(() => {
      const aiResponse = 'AI 응답';
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          id: Date.now(),
          type: ai,
          content: aiResponse,
          createdAt: formatFullDateToString(new Date()),
        };
        saveMessagesToLocalStorage(updatedMessages);
        return updatedMessages;
      });
      setIsLoading(false);
    }, 1000);
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
              m.type === 'dada' ? (
                <AiChatBox key={m.id} ai="dada">
                  <LeftChatBox date={m.createdAt}>{m.content}</LeftChatBox>
                </AiChatBox>
              ) : m.type === 'lulu' ? (
                <AiChatBox key={m.id} ai="lulu">
                  <LeftChatBox date={m.createdAt}>{m.content}</LeftChatBox>
                </AiChatBox>
              ) : m.type === 'chichi' ? (
                <AiChatBox key={m.id} ai="chichi">
                  <LeftChatBox date={m.createdAt}>{m.content}</LeftChatBox>
                </AiChatBox>
              ) : m.type == 'user' ? (
                isImageUrl(m.content as string) ? (
                  <PhotoChatBox url={m.content as string} date={m.createdAt} />
                ) : (
                  <RightChatBox date={m.createdAt} key={m.id}>
                    {m.content}
                  </RightChatBox>
                )
              ) : (
                <p className={styles.aiChanged}>{m.content}</p>
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
        <DateSelector clickOuter={setIsSelectedDate} isFullDate={true} isOpen={isSelectedDate}/>
      ) : null}
    </div>
  );
};

export default Chat;
