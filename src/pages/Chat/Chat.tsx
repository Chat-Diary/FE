import styles from './Chat.module.scss';
import { DadaChat, LuluChat, ChichiChat, Plus } from '../../assets';
import LeftChatBox from '../../components/common/LeftChatBox';
import RightChatBox from '../../components/common/RightChatBox';

interface AIProfile {
  name: string;
}

const Chat = () => {
  return (
    <div>
      <div className={styles.messagesContainer}>
        <LuluChat />
        <ChichiChat />
        <div className={styles.aiChatBox}>
          <DadaChat />
          <div className={styles.messagesWrapper}>
            <p className={styles.aiName}>다다</p>
            <LeftChatBox>이렇게! 이렇게!</LeftChatBox>
            <LeftChatBox>{`I'm 진정이에요`}</LeftChatBox>
            <LeftChatBox>장충동 왕족발 보쌈!</LeftChatBox>
          </div>
        </div>
        <RightChatBox>공습경보! 공습경보!</RightChatBox>
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
