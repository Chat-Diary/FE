import { DadaChat, LuluChat, ChichiChat } from '../../assets';
import LeftChatBox from '../../components/common/LeftChatBox';
import styles from './AiChatBox.module.scss';

interface IProps {
  ai: string;
}

const AiChatBox = ({ ai }: IProps) => {
  return (
    <>
      <div className={styles.container}>
        {ai === 'dada' ? (
          <DadaChat />
        ) : ai === 'lulu' ? (
          <LuluChat />
        ) : (
          <ChichiChat />
        )}
        <div className={styles.messagesWrapper}>
          <p className={styles.aiName}>
            {ai === 'dada' ? '다다' : ai === 'lulu' ? '루루' : '치치'}
          </p>
          <LeftChatBox>이렇게! 이렇게!</LeftChatBox>
          <LeftChatBox>{`I'm 진정이에요`}</LeftChatBox>
          <LeftChatBox>장충동 왕족발 보쌈!</LeftChatBox>
        </div>
      </div>
    </>
  );
};

export default AiChatBox;
