import React from 'react';
import styles from './LeftChatBox.module.scss';
import { formatHourAndMinute } from '../../utils/dateFormatters';

interface IProps {
  children: React.ReactNode;
  date: string;
}

const LeftChatBox = ({ children, date }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{children}</div>
      <span className={styles.time}>{formatHourAndMinute(date)}</span>
    </div>
  );
};

export default LeftChatBox;
