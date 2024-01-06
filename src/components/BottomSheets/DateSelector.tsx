import styles from './DateSelector.module.scss';
import BottomModal from './BottomModal';
import DatePicker from './DatePicker';

const DateSelector = () => {
  const year = ['2021년', '2022년', '2023년', '2024년'];
  const month = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];
  const day = ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일', '13일', '14일'];

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
