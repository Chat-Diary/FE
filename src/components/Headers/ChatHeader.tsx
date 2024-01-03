import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatHeader.module.scss';
import { LeftChevron, CalendarIcon } from '../../assets';

interface IProps {
  children: React.ReactNode;
}

const ChatHeader = ({ children }: IProps) => {
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <LeftChevron onClick={onGoBack} />
      <h3 className={styles.title}>{children}</h3>
      <CalendarIcon />
    </div>
  );
};

export default ChatHeader;
