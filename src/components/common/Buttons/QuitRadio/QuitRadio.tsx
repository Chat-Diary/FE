import React from 'react';
import ChangeRadioBtn from '../ChangeRadio/ChangeRadioBtn';
import styles from './QuitRadio.module.scss';

interface IProps {
  id: number;
  text: string;
  onClick: (id: number) => void;
}

const QuitRadio = ({ id, text, onClick }: IProps) => {
  return (
    <div className={styles.container}>
      <span>{text}</span>
      <ChangeRadioBtn id={id} onChange={onClick} />
    </div>
  );
};

export default QuitRadio;
