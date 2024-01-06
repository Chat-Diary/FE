import styles from './DateSelector.module.scss';
import BottomModal from './BottomModal'

const DateSelector = () => {
  return (
    <BottomModal>
      <div>
        <div className={styles.selectDate}>날짜 선택</div>
      </div>
    </BottomModal>
  )
  
};

export default DateSelector;
