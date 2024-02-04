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
import { useQuery } from 'react-query';
import { getDiaryList } from '../../apis/diaryListApi';
import { getDiaryStreakDate } from '../../apis/home';

const Home = () => {
  const [isList, setIsList] = useState(false);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const [diaryList, setDiaryList] = useState([]);
  const [diaryStreakDate, setDiaryStreakDate] = useState();

  const onClickSelector = () => {
    setIsSelectedDate(true);
  };

  const onSelectDate = (year: number, month: number) => {
    setCurrentDate(new Date(year, month - 1));
    setIsSelectedDate(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [
      'diary',
      userId,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ],
    queryFn: () => {
      return [
        getDiaryList(
          userId,
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
        ),
        getDiaryStreakDate(),
      ];
    },
  });

  useEffect(() => {
    if (data) {
      Promise.all(data).then(([listData, streakData]) => {
        setDiaryList(listData);
        setDiaryStreakDate(streakData);
      })
    }
  }, [data]);

  if (isLoading) {
    return <>loading..</>;
  }

  if (error) console.log(error);

  return (
    <>
      <HomeHeader />
      <div className={styles.wholeWrapper}>
        <HomeProfileHeader diaryStreakDate={diaryStreakDate}/>
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
            <span className={styles.diaryNumber}>
              {data ? data.length : 0}개의 일기
            </span>
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
          diaryList ? (
            <List dataList={diaryList} />
          ) : (
            <></>
          )
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
