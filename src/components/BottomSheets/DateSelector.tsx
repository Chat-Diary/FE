import styles from './DateSelector.module.scss';

import { useNavigate } from 'react-router-dom';

import BottomModal from './BottomModal';
import DatePicker from './DatePicker';
import ConfirmButton from '../Buttons/ConfirmButton';

interface DateSelectorProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateSelector = (props: DateSelectorProps) => {
  const year = ['2000년', '2001년', '2002년', '2003년', '2004년', '2005년', '2006년', '2007년', '2008년',
  '2009년', '2010년', '2011년', '2012년', '2013년', '2014년', '2015년', '2016년', 
  '2017년', '2018년', '2019년', '2020년', '2021년', '2022년', '2023년', '2024년'];
  const month = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];
  const day = ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', 
  '11일', '12일', '13일', '14일', '15일', '16일', '17일', '18일', '19일', '20일', 
  '21일', '22일', '23일', '24일', '25일', '26일', '27일', '28일', '29일', '30일', '31일'];
  
  const handleYear = () => {
    return;
  };

  const navigate = useNavigate();

  const handleDateSelect = (id: number) => {
    props.clickOuter(false);
  };

  return (
    <BottomModal clickOuter={props.clickOuter}>
      <div className={styles.SelectDateContainer}>
        <div className={styles.SelectDate}>날짜 선택</div>
        <div className={styles.DatePicker}>
          <DatePicker list={year} onSelectedChange={handleYear}/>
          <DatePicker list={month} onSelectedChange={handleYear}/>
          <DatePicker list={day} onSelectedChange={handleYear}/>
        </div>
        <div className={styles.DateListCenter}/>
      </div>
      <ConfirmButton isAble={true} id={1} onClick={handleDateSelect}>
        선택 완료
      </ConfirmButton>
    </BottomModal>
  )
  
};

export default DateSelector;
