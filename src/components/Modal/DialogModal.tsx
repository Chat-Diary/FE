import React from 'react';
import styles from './DialogModal.module.scss';
import DialogBtn from '../Buttons/DialogBtn';

interface IProps {
  cancelText: string;
  confirmText: string;
  onClickCancel: () => any;
  onClickConfirm: () => any;
}
const DialogModal = ({
  cancelText,
  confirmText,
  onClickCancel,
  onClickConfirm,
}: IProps) => {
  return (
    <>
      <div className={styles.backDrop}></div>
      <div className={styles.modalContainer}>
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
