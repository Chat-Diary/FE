import React from 'react';
import BottomModal from './BottomModal';
import styles from './DetailPlusModal.module.scss';

import { DetailDelete, DetailShare } from '../../assets/index';

interface DetailPlusProps {
  clickOuter: () => any;
  clickDelete: () => any;
}
const DetailPlusModal = ({ clickOuter, clickDelete }: DetailPlusProps) => {
  return (
    <BottomModal clickOuter={clickOuter} /*className={styles.container}*/>
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
