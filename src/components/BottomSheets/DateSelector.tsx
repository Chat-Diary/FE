import styles from './DateSelector.module.scss';
import BottomModal from './BottomModal';
import DatePicker from './DatePicker';
import ConfirmButton from '../Buttons/ConfirmButton';

interface DateSelectorProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
  isDate: boolean;
}

const DateSelector = (props: DateSelectorProps) => {
  const year = [
    '2000년',
    '2001년',
    '2002년',
    '2003년',
    '2004년',
    '2005년',
    '2006년',
    '2007년',
    '2008년',
    '2009년',
    '2010년',
    '2011년',
    '2012년',
    '2013년',
    '2014년',
    '2015년',
    '2016년',
    '2017년',
    '2018년',
    '2019년',
    '2020년',
    '2021년',
    '2022년',
    '2023년',
    '2024년',
  ];
  const month = [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ];
  const day = [
    '01일',
    '02일',
    '03일',
    '04일',
    '05일',
    '06일',
    '07일',
    '08일',
    '9일',
    '10일',
    '11일',
    '12일',
    '13일',
    '14일',
    '15일',
    '16일',
    '17일',
    '18일',
    '19일',
    '20일',
    '21일',
    '22일',
    '23일',
    '24일',
    '25일',
    '26일',
    '27일',
    '28일',
    '29일',
    '30일',
    '31일',
  ];

  const handleYear = () => {
    return;
  };

  const handleMonth = () => {
    return;
  };

  const handleDay = () => {
    return;
  };

  const handleDateSelect = () => {
    props.clickOuter(false);
  };

  return (
    <BottomModal clickOuter={props.clickOuter}>
      <div className={styles.container}>
        <div className={styles.SelectDateContainer}>
          {props.isDate ? (
            <div className={styles.SelectDate}>날짜 선택</div>
          ) : (
            <div className={styles.SelectDate}>년/월 선택</div>
          )}
          <div className={styles.DatePicker}>
            <DatePicker list={year} onSelectedChange={handleYear} />
            <DatePicker list={month} onSelectedChange={handleMonth} />
            {props.isDate ? (
              <DatePicker list={day} onSelectedChange={handleDay} />
            ) : (
              <></>
            )}
          </div>
          <div className={styles.DateListCenter} />
        </div>
        <ConfirmButton isAble={true} id={1} onClick={handleDateSelect}>
          선택 완료
        </ConfirmButton>
      </div>
    </BottomModal>
  );
};

export default DateSelector;
