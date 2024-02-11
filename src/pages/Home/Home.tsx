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
import { Diary, StreakDate } from '../../utils/diary';
import usePageStore from '../../stores/pageStore';

const Home = () => {
  // 현재 페이지 경로 및 list 여부 저장
  const getPage = usePageStore((state) => state.getPage);
  const setPage = usePageStore((state) => state.setPage);
  const prevHomeType = getPage()[1];

  const [isList, setIsList] = useState(prevHomeType);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };

  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const [diaryList, setDiaryList] = useState<Diary[]>();
  const [diaryStreakDate, setDiaryStreakDate] = useState<StreakDate>();

  const onClickSelector = () => {
    setIsSelectedDate(true);
  };

  const onSelectDate = (year: number, month: number) => {
    setCurrentDate(new Date(year, month - 1));
    setIsSelectedDate(false);
  };

  const {
    isLoading: listLoading,
    error: listError,
    data: diaryListData,
  } = useQuery({
    queryKey: [
      'diary',
      userId,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ],
    queryFn: () =>
      getDiaryList(
        userId,
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
      ),
  });

  const {
    isLoading: streakLoading,
    error: streakError,
    data: streakDateData,
  } = useQuery({
    queryKey: ['diaryStreakDate', userId],
    queryFn: () => getDiaryStreakDate(userId),
  });

  useEffect(() => {
    setPage(location.pathname, isList, true);
  }, [isList]);

  useEffect(() => {
    if (diaryListData) {
      Promise.all(diaryListData).then((listData: Diary[]) => {
        setDiaryList(listData);
      });
    }
  }, [diaryListData]);

  useEffect(() => {
    setDiaryStreakDate(streakDateData);
  }, [streakDateData]);

  if (streakLoading) {
    return <>loading..</>;
  }

  if (streakError) console.log('Home streak error : ', streakError);
  if (listError) console.log('Home List error : ', listError);

  return (
    <>
      <HomeHeader />
      <div className={styles.wholeWrapper}>
        <HomeProfileHeader diaryStreakDate={diaryStreakDate} />
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
              {diaryList ? diaryList.length : 0}개의 일기
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
            <List dataList={diaryList} isLoading={listLoading}/>
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
