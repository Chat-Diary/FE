import React from 'react';
import styles from './DateSelector.module.scss';
import BottomModal from '../BottomModal';
import DatePicker from './DatePicker';
import ConfirmButton from '../../Buttons/ConfirmBtn/ConfirmButton';
import useDateStore from '../../../../stores/dateStore';

interface DateSelectorProps {
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
  isFullDate: boolean;
  isOpen: boolean;
  onSelectDate: (year: number, month: number, day: number) => void;
}

const DateSelector = ({
  clickOuter,
  isFullDate,
  isOpen,
  onSelectDate,
}: DateSelectorProps) => {
  const { year, month, day, setYear, setMonth } = useDateStore();

  const yearList = ['2020년', '2021년', '2022년', '2023년', '2024년'];
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
    const yearFormattedString = selectedItem as string;
    setYear(Number(yearFormattedString.replace(/[^0-9]/g, '')));
  };

  const handleChangeMonth = (selectedItem: string | number) => {
    const monthFormattedString = selectedItem as string;
    setMonth(Number(monthFormattedString.replace(/[^0-9]/g, '')));
  };

  const handleChangeDay = (selectedItem: string | number) => {
    const dayFormattedString = selectedItem as string;
    setMonth(Number(dayFormattedString.replace(/[^0-9]/g, '')));
  };

  const onClickConfirmButton = () => {
    onSelectDate(Number(year), Number(month), Number(day));
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
            <DatePicker
              list={yearList}
              prevSelected={year - 2019}
              onSelectedChange={handleChangeYear}
            />
            <DatePicker
              list={monthList}
              prevSelected={month}
              onSelectedChange={handleChangeMonth}
            />
            {isFullDate ? (
              <DatePicker
                list={dayList}
                prevSelected={day}
                onSelectedChange={handleChangeDay}
              />
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
