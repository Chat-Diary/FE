import styles from './Chat.module.scss';
import { Plus } from '../../assets';
import RightChatBox from '../../components/common/RightChatBox';
import ChatHeader from '../../components/Headers/ChatHeader';
import AiChatBox from '../../components/common/AiChatBox';

const Chat = () => {
  return (
    <div>
      <ChatHeader>다다</ChatHeader>
      <div className={styles.messagesContainer}>
        <AiChatBox ai="dada" />
        <RightChatBox>공습경보! 공습경보!</RightChatBox>
        <p
          className={styles.aiChanged}
        >{`대화 상대가 '루루'로 변경되었습니다.`}</p>
        <AiChatBox ai="lulu" />
      </div>
      <div className={styles.inputBox}>
        <button className={styles.plusBtn}>
          <Plus />
        </button>
        <input className={styles.input} />
        <button className={styles.submitBtn}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
