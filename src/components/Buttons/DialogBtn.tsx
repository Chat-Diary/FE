import React from 'react';
import styles from './DialogBtn.module.scss';

interface Iprops {
  children: string;
  isActive: boolean;
  onClick: () => void;
}
const DialogBtn = ({ children, isActive, onClick }: Iprops) => {
  return (
    <div
      className={`${styles.btn} ${isActive ? styles.activeBtn : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DialogBtn;
