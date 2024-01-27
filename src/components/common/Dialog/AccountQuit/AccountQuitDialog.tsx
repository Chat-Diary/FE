import React from 'react';
import DialogModal from '../DialogModal';
import styles from './AccountQuitDialog.module.scss';

interface IProps {
  onClickCancel: () => void;
  onClickConfirm: () => void;
  isOpen: boolean;
}

const AccountQuitDialog = ({
  onClickCancel,
  onClickConfirm,
  isOpen,
}: IProps) => {
  return (
    <DialogModal
      cancelText="계속 쓰기"
      confirmText="탈퇴하기"
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
      isOpen={isOpen}
    >
      <div className={styles.header}>탈퇴하기</div>
      <div className={styles.content}>
        탈퇴하면 채팅, 일기 내용이 삭제되고<br></br>복구할 수 없어요.<br></br>
        정말 탈퇴하시겠어요?
      </div>
    </DialogModal>
  );
};

export default AccountQuitDialog;
