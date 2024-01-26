import React from 'react';
import DialogModal from '../DialogModal';
import styles from './LogoutDialog.module.scss';

interface IProps {
  onClickCancel: () => void;
  onClickConfirm: () => void;
  isOpen: boolean;
}
const LogoutDialog = ({
  onClickCancel,
  onClickConfirm,
  isOpen,
}: IProps) => {
  return (
    <DialogModal
      cancelText="아니오"
      confirmText="네"
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
      isOpen={isOpen}
    >
      <div className={styles.header}>정말 로그아웃 할까요?</div>
    </DialogModal>
  );
};

export default LogoutDialog;