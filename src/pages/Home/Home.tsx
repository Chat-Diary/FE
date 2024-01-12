import { useState } from 'react';
import useCalendar from '../../hooks/useCalendar';
import styles from './Home.module.scss';
import HomeCalendar from './HomeCalendar';
import List from './List';
import { ListIcon, DownChevron, Calendar32 } from '../../assets';

const Home = () => {
  const [isList, setIsList] = useState(false);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };
  const { weekCalendarList, currentDate } = useCalendar();
  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.dateNav}>
        <div className={styles.currentDateBox}>
          <div className={styles.dateSelector}>
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
          <p className={styles.today}>오늘</p>
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
  );
};

export default Home;
