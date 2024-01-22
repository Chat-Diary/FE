import React from 'react';
import BottomModal from './BottomModal';
import styles from './DetailPlusModal.module.scss';

import { DetailDelete, DetailShare } from '../../assets/index';

interface IProps {
  clickOuter: () => void;
  clickDelete: () => void;
  isOpen: boolean;
}
const DetailPlusModal = ({ clickOuter, clickDelete, isOpen }: IProps) => {
  return (
    <BottomModal
      clickOuter={clickOuter}
      isOpen={isOpen} /*className={styles.container}*/
    >
      <div className={styles.container}>
        <div className={styles.btn} onClick={clickDelete}>
          <DetailDelete />
          <span>삭제하기</span>
        </div>
        <div className={styles.btn}>
          <DetailShare />
          <span>공유하기</span>
        </div>
      </div>
    </BottomModal>
  );
};

export default DetailPlusModal;
