import React from 'react';
import styles from './RightChatBox.module.scss';

interface IProps {
  children: React.ReactNode;
}

const RightChatBox = ({ children }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>오전 9:54</span>
      <div className={styles.message}>{children}</div>
    </div>
  );
};

export default RightChatBox;
