import React, { useState } from 'react';
import styles from './DateSelector.module.scss';
import BottomModal from '../BottomModal';
import DatePicker from './DatePicker';
import ConfirmButton from '../../Buttons/ConfirmBtn/ConfirmButton';

interface DateSelectorProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
  isFullDate: boolean;
  isOpen: boolean;
  onSelectDate: (
    year: number,
    month: number,
    day: number,
  ) => void;
}

const DateSelector = ({
  clickOuter,
  isFullDate,
  isOpen,
  onSelectDate,
}: DateSelectorProps) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const yearList = [
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
  const monthList = [
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
  const dayList = [
    '01일',
    '02일',
    '03일',
    '04일',
    '05일',
    '06일',
    '07일',
    '08일',
    '09일',
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

  const handleChangeYear = (selectedItem: string | number) => {
    setYear(selectedItem as string);
  };

  const handleChangeMonth = (selectedItem: string | number) => {
    setMonth(selectedItem as string);
  };

  const handleChangeDay = (selectedItem: string | number) => {
    setDay(selectedItem as string);
  };

  const onClickConfirmButton = () => {
    const yearFormattedString = year.replace(/[^0-9]/g, '');
    const monthFormattedString = month.replace(/[^0-9]/g, '');
    const dayFormattedString = day.replace(/[^0-9]/g, '');

    onSelectDate(Number(yearFormattedString), Number(monthFormattedString), Number(dayFormattedString));
  };

  return (
    <BottomModal clickOuter={clickOuter} isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.SelectDateContainer}>
          {isFullDate ? (
            <div className={styles.SelectDate}>날짜 선택</div>
          ) : (
            <div className={styles.SelectDate}>년/월 선택</div>
          )}
          <div className={styles.DatePicker}>
            <DatePicker list={yearList} onSelectedChange={handleChangeYear} />
            <DatePicker list={monthList} onSelectedChange={handleChangeMonth} />
            {isFullDate ? (
              <DatePicker list={dayList} onSelectedChange={handleChangeDay} />
            ) : (
              <></>
            )}
          </div>
          <div className={styles.DateListCenter} />
        </div>
        <ConfirmButton isAble={true} id={1} onClick={onClickConfirmButton}>
          선택 완료
        </ConfirmButton>
      </div>
    </BottomModal>
  );
};

export default DateSelector;
