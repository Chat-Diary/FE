import React from 'react';
import BottomModal from './BottomModal';
import styles from './TagSortModal.module.scss';

interface IProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagSortModal = ({ clickOuter }: IProps) => {
  return (
    <BottomModal clickOuter={clickOuter}>
      <div>
        <div className={styles.container}>
          <div className={styles.sort}>정렬</div>
        </div>
      </div>
    </BottomModal>
  );
};

export default TagSortModal;
