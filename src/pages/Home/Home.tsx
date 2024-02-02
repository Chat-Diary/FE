import { useState } from 'react';
import useCalendar from '../../hooks/useCalendar';
import styles from './Home.module.scss';
import HomeCalendar from '../../components/Home/Calendar/HomeCalendar';
import List from '../../components/Home/List/List';
import { ListIcon, DownChevron, Calendar32 } from '../../assets';
import BottomNav from '../../components/common/BottomNav/BottomNav';
import HomeHeader from '../../components/common/Header/Header';
import HomeProfileHeader from '../../components/common/Header/HomeProfildHeader/HomeProfileHeader';
import DateSelector from '../../components/common/BottomSheets/DateSelect/DateSelector';

const Home = () => {
  const [isList, setIsList] = useState(false);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const [isSelectedDate, setIsSelectedDate] = useState(false);

  const onClickSelector = () => {
    setIsSelectedDate(true);
  };

  const onSelectDate = (year: string | number, month: string | number) => {
    setCurrentDate(new Date(year as number, month as number-1));
    setIsSelectedDate(false);
  };

  return (
    <>
      <HomeHeader />
      <div className={styles.wholeWrapper}>
        <HomeProfileHeader />
        <div className={styles.dateNav}>
          <div className={styles.currentDateBox}>
            <div className={styles.dateSelector} onClick={onClickSelector}>
              <p className={styles.yearAndMonth}>
                {currentDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
              <div className={styles.chevronWrapper}>
                <DownChevron />
              </div>
            </div>
            <span className={styles.diaryNumber}>12개의 일기</span>
          </div>
          <div className={styles.rightContainer}>
            <p
              className={styles.today}
              onClick={() => setCurrentDate(new Date())}
            >
              오늘
            </p>
            <div className={styles.iconWrapper} onClick={toggleMode}>
              {isList ? <Calendar32 /> : <ListIcon />}
            </div>
          </div>
        </div>
        {isList ? (
          <List />
        ) : (
          <HomeCalendar
            weekCalendarList={weekCalendarList}
            currentDate={currentDate}
          />
        )}
      </div>
      {isSelectedDate ? (
        <DateSelector
          clickOuter={setIsSelectedDate}
          isFullDate={false}
          isOpen={isSelectedDate}
          onSelectDate={onSelectDate}
        />
      ) : null}
      <BottomNav page={0} />
    </>
  );
};

export default Home;
