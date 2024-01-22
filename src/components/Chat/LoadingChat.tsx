import styles from './LoadingChat.module.scss';

const LoadingChat = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
    </div>
  );
};

export default LoadingChat;
