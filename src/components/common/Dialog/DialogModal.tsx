import React, { useEffect } from 'react';
import styles from './DialogModal.module.scss';
import DialogBtn from '../Buttons/DialogBtn';

interface IProps {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
  cancelText: string;
  confirmText: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  isOpen: boolean;
}
const DialogModal = ({
  children,
  cancelText,
  confirmText,
  onClickCancel,
  onClickConfirm,
  isOpen,
}: IProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
