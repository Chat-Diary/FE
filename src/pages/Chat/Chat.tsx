import React, { useState, ReactNode, useEffect } from 'react';
import styles from './Chat.module.scss';
import { Plus } from '../../assets';
import RightChatBox from '../../components/common/RightChatBox';
import ChatHeader from '../../components/Headers/ChatHeader';
import AiChatBox from '../../components/common/AiChatBox';
import LeftChatBox from '../../components/common/LeftChatBox';
import LoadingChat from '../../components/common/LoadingChat';
import DateSelector from '../../components/BottomSheets/DateSelector';
import { formatFullDateToString } from '../../utils/dateFormatters';

interface IMessage {
  id: number;
  type: string;
  content: string | ReactNode;
  createdAt: string;
}

const saveMessagesToLocalStorage = (messages: IMessage[]) => {
  localStorage.setItem('chatData', JSON.stringify(messages));
};

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  console.log(localStorage.getItem('chatData'));
  const [inputText, setInputText] = useState('');
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSelectDate = () => {
    setIsSelectedDate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '' || isLoading) return;

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
        type: 'lulu',
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
          type: 'lulu',
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
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <ChatHeader onClick={onSelectDate} />
      <div className={styles.messagesContainer}>
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
          ) : (
            <RightChatBox date={m.createdAt} key={m.id}>
              {m.content}
            </RightChatBox>
          ),
        )}
        {/* <RightChatBox>공습경보! 공습경보!</RightChatBox>
        <AiChatBox ai="dada">
          <LeftChatBox>이렇게! 이렇게!</LeftChatBox>
        </AiChatBox>
        <p
          className={styles.aiChanged}
        >{`대화 상대가 '루루'로 변경되었습니다.`}</p>
        <RightChatBox>안녕</RightChatBox>
        <AiChatBox ai="lulu">
          <LeftChatBox>
            <LoadingChat />
          </LeftChatBox>
        </AiChatBox> */}
      </div>
      <div className={styles.inputBox}>
        <button className={styles.plusBtn}>
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
      {isSelectedDate ? (
        <DateSelector clickOuter={setIsSelectedDate} isFullDate={true} />
      ) : null}
    </div>
  );
};

export default Chat;
