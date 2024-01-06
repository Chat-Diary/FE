import React from 'react';
import styles from './LeftChatBox.module.scss';

interface IProps {
  children: React.ReactNode;
}

const LeftChatBox = ({ children }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{children}</div>
      <span className={styles.time}>오전 9:54</span>
    </div>
  );
};

export default LeftChatBox;
