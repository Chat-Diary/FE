import React from 'react';
import BottomModal from './BottomModal';
import styles from './DetailPlusModal.module.scss';

import { DetailDelete, DetailShare } from '../../assets/index';

interface DetailPlusProps {
  clickOuter: () => any;
}
const DetailPlusModal = ({ clickOuter }: DetailPlusProps) => {
  return (
    <BottomModal clickOuter={clickOuter} /*className={styles.container}*/>
      <div className={styles.container}>
        <div className={styles.btn}>
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
