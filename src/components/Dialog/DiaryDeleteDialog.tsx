import React from 'react';
import DialogModal from './DialogModal';
import styles from './DiaryDeleteDialog.module.scss';

interface IProps {
  onClickCancel: () => void;
  onClickConfirm: () => void;
}
const DiaryDeleteDialog = ({ onClickCancel, onClickConfirm }: IProps) => {
  return (
    <DialogModal
      cancelText="아니오"
      confirmText="삭제하기"
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
    >
      <div className={styles.header}>삭제하기</div>
      <div className={styles.content}>
        한번 삭제된 일기는 다시 복구되지 않아요. <br></br> 정말 삭제하시겠어요?
      </div>
    </DialogModal>
  );
};

export default DiaryDeleteDialog;
