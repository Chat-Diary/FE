import styles from './DateSelector.module.scss';
import BottomModal from './BottomModal';
import DatePicker from './DatePicker';

interface ScrollPickerProps {
  list: (string | number)[];
  onSelectedChange?: (selected: string | number) => void;
}

const DateSelector = () => {
  const year = [2021, 2022, 2023, 2024];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const day = [1, 2, 3, 4];

  const handleYear = () => {
    return;
  };

  return (
    <BottomModal>
      <div className={styles.SelectDateContainer}>
        <div className={styles.SelectDate}>날짜 선택</div>
        <div className={styles.DatePicker}>
          <DatePicker list={year} onSelectedChange={handleYear}/>
          <DatePicker list={month} onSelectedChange={handleYear}/>
          <DatePicker list={day} onSelectedChange={handleYear}/>
        </div>
      </div>
    </BottomModal>
  )
  
};

export default DateSelector;
