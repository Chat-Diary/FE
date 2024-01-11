import { ReactNode } from 'react';
import { Dada36, Lulu36, Chichi36 } from '../../assets';
import { useNavigate } from 'react-router-dom';
import styles from './AiChatBox.module.scss';

interface IProps {
  ai: string;
  children: ReactNode;
}

const AiChatBox = ({ ai, children }: IProps) => {
  const navigate = useNavigate();
  const goToChange = () => {
    navigate('/chat/profile');
  };

  return (
    <>
      <div className={styles.container}>
        {ai === 'dada' ? (
          <Dada36 onClick={goToChange} />
        ) : ai === 'lulu' ? (
          <Lulu36 onClick={goToChange} />
        ) : (
          <Chichi36 onClick={goToChange} />
        )}
        <div className={styles.messagesWrapper}>
          <p className={styles.aiName} onClick={goToChange}>
            {ai === 'dada' ? '다다' : ai === 'lulu' ? '루루' : '치치'}
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export default AiChatBox;