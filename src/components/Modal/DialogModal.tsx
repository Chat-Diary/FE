import React from 'react';
import styles from './DialogModal.module.scss';
import DialogBtn from '../Buttons/DialogBtn';

interface IProps {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
  cancelText: string;
  confirmText: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
}
const DialogModal = ({
  children,
  cancelText,
  confirmText,
  onClickCancel,
  onClickConfirm,
}: IProps) => {
  return (
    <>
      <div className={styles.backDrop}></div>
      <div className={styles.modalContainer}>
        {children}
        <div className={styles.btns}>
          <div className={styles.btn}>
            <DialogBtn isActive={false} onClick={onClickCancel}>
              {cancelText}
            </DialogBtn>
          </div>
          <div className={styles.btn}>
            <DialogBtn isActive={true} onClick={onClickConfirm}>
              {confirmText}
            </DialogBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogModal;
