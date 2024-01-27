import { useEffect, useState } from 'react';
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

  const onSelectDate = () => {
    setIsSelectedDate(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentDate(new Date(2023, 10)); // 2023년 11월로 변경
    }, 3000); // 3초 후에 실행될 수 있도록 설정

    // 컴포넌트가 언마운트되면 타임아웃 클리어
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <HomeHeader />
      <div className={styles.wholeWrapper}>
        <HomeProfileHeader />
        <div className={styles.dateNav}>
          <div className={styles.currentDateBox}>
            <div className={styles.dateSelector} onClick={onSelectDate}>
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
        />
      ) : null}
      <BottomNav page={0} />
    </>
  );
};

export default Home;
