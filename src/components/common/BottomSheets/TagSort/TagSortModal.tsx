import React from 'react';
import { useState } from 'react';
import BottomModal from '../BottomModal';
import styles from './TagSortModal.module.scss';
import SortRadio from '../../Buttons/SortRadio/SortRadio';
import ConfirmButton from '../../Buttons/ConfirmBtn/ConfirmButton';

interface IProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  currentSort: number;
  setCurrentSort: (id: number) => void;
}

const TagSortModal = ({
  clickOuter,
  isOpen,
  currentSort,
  setCurrentSort,
}: IProps) => {
  const [checkedId, setCheckedId] = useState<number>(currentSort);

  const handleRadioChange = (id: number) => {
    setCheckedId(id);
  };

  const handleSortSelect = () => {
    if (currentSort !== checkedId) setCurrentSort(checkedId);
    clickOuter(false);
  };

  // useEffect(() => {
  //   if (isNew) {
  //     setCheckedId(0);
  //   } else {
  //     setCheckedId(1);
  //   }
  // });

  return (
    <BottomModal clickOuter={clickOuter} isOpen={isOpen}>
      <div className={styles.sortContainer}>
        <div className={styles.sortTitle}>정렬</div>
        <div className={styles.sortRadio}>
          <label className={`${checkedId === 1 ? '' : styles.uncheckedLabel}`}>
            <SortRadio
              id={1}
              name={'오래된순'}
              checkedId={checkedId}
              onClick={handleRadioChange}
            />
          </label>
          <label className={`${checkedId === 2 ? '' : styles.uncheckedLabel}`}>
            <SortRadio
              id={2}
              name={'최신순'}
              checkedId={checkedId}
              onClick={handleRadioChange}
            />
          </label>
        </div>
      </div>
      <ConfirmButton isAble={true} id={1} onClick={handleSortSelect}>
        선택 완료
      </ConfirmButton>
    </BottomModal>
  );
};

export default TagSortModal;
