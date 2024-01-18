import React from 'react';
import styles from './RightChatBox.module.scss';
import { formatHourAndMinute } from '../../utils/dateFormatters';

interface IProps {
  children: React.ReactNode;
  date: string;
}

const RightChatBox = ({ children, date }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>{formatHourAndMinute(date)}</span>
      <div className={styles.message}>{children}</div>
    </div>
  );
};

export default RightChatBox;
