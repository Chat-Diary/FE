/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Dada48,
  Chichi48,
  Lulu48,
  DadaCrying,
  ChichiCrying,
  LuluCrying,
  Notice,
  RightChevron,
} from '../../assets';
import BottomNav from '../../components/common/BottomNav/BottomNav';
import styles from './Analysis.module.scss';
import HomeHeader from '../../components/common/Header/Header';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  frequentAiType,
  frequentTagType,
  getFrequentAis,
  getFrequentTags,
} from '../../apis/analysisApi';
import { getDiaryStreakDate } from '../../apis/home';
import { StreakDate } from '../../utils/diary';

export const Analysis = () => {
  const [tagData, setTagData] = useState<frequentTagType[]>([]);
  const [aiData, setAiData] = useState<frequentAiType[]>([]);
  const [noTag, setNoTag] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [urlStartDate, setUrlStartDate] = useState<string>();
  const [urlEndDate, setUrlEndDate] = useState<string>();

  const periodTab = ['이번 주', '이번 달', '올해'];
  const [activeTab, setActiveTab] = useState(0);

  const [diaryStreakDate, setDiaryStreakDate] = useState<StreakDate>();

  // UI 상에서 파싱된 날짜 보여주기 위한 함수
  const parseDate = (date: Date, isUrl?: boolean) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (isUrl) {
      const parsedDate = year + month + day;
      return parsedDate;
    }

    const parsedDate = year + '년 ' + month + '월 ' + day + '일';
    return parsedDate;
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const {
    isLoading: streakLoading,
    error: streakError,
    data: streakDateData,
  } = useQuery({
    queryKey: ['diaryStreakDate'],
    queryFn: () => getDiaryStreakDate(),
  });

  useEffect(() => {
    setDiaryStreakDate(streakDateData);
  }, [streakDateData]);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['user_id', 'type', 'date', activeTab],
    queryFn: () => {
      let type = '';
      switch (activeTab) {
        case 0:
          type = 'weekly';
          break;
        case 1:
          type = 'monthly';
          break;
        case 2:
          type = 'yearly';
          break;
      }

      return [getFrequentTags(type), getFrequentAis(type)];
    },
  });

  useEffect(() => {
    if (data) {
      Promise.all(data).then(([tagsData, aisData]) => {
        if (tagsData) {
          setTagData((prev) => {
            setNoTag(false);
            const slicedTagsData = tagsData.statistics.slice(0, 3);

            // url 넘길 때 string으로 넘겨야 함
            setUrlStartDate(tagsData.startDate);
            setUrlEndDate(tagsData.endDate);

            // timestamp 형식에서 YYYY년 MM월 DD일 형식으로 바꾸기 위함
            const startObject = new Date(tagsData.startDate);
            setStartDate(startObject);
            const endObject = new Date(tagsData.endDate);
            setEndDate(endObject);

            if (slicedTagsData.length === 0) {
              setNoTag(true);
              return 0;
            }

            return slicedTagsData;
          });
        }

        // 기본 캐릭터 정보
        const defaultAi = [
          { sender: 'DADA', chatCount: 0, percentage: 0 },
          { sender: 'CHICHI', chatCount: 0, percentage: 0 },
          { sender: 'LULU', chatCount: 0, percentage: 0 },
        ];

        if (aisData) {
          if (aisData.statistics.length === 0) setAiData(defaultAi);
          else setAiData(aisData.statistics);
        }
      });
    }
  }, [data, activeTab]);

  // activeTab이 변경될 때마다 refetch 호출
  useEffect(() => {
    refetch();
  }, [activeTab]);

  if (isLoading || streakLoading) return <div>Loading...</div>;

  if (error) console.log('Analysis error : ', error);
  if (streakError) console.log('Analysis streak error : ', streakError);

  return (
    <>
      <HomeHeader />
      <div className={styles.notice}>
        <Notice />
        <span className={styles.streak}>
          꾸준히 일기를 쓴 지
          <span className={styles.streakNumber}>
            {' '}
            {diaryStreakDate?.diaryStreakDate}일째{' '}
          </span>
          에요!
        </span>
      </div>
      <div className={styles.tab}>
        {periodTab.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tabBtn} ${
              index === activeTab ? styles.activeTabBtn : styles.inactiveTabBtn
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.tagChartBox}>
        <div className={styles.chartTitleBox}>
          <h2 className={styles.chartTitle}>자주 사용한 태그</h2>
          <div className={styles.chartPeriodContainer}>
            <p className={styles.chartPeriod}>
              {parseDate(startDate ? startDate : new Date(), false)}
            </p>
            <p className={styles.chartPeriod}>~</p>
            <p className={styles.chartPeriod}>
              {parseDate(endDate ? endDate : new Date(), false)}
            </p>
          </div>
        </div>
        <div className={styles.barsBox}>
          {noTag ? (
            <div className={styles.noTag}>
              아직 태그를 사용한 적이 없어요.<br></br>일기에 태그를
              적용해보세요!
            </div>
          ) : (
            <>
              {tagData.map((data, index) => (
                <div key={index} className={styles.barWrapper}>
                  <span className={styles.portionNumber}>
                    {data.percentage}%
                  </span>
                  <div
                    className={styles.bar}
                    style={{
                      height: `${
                        (data.percentage / tagData[0].percentage) * 100
                      }%`,
                    }}
                  ></div>
                  <h4 className={styles.tagName}>{`#${data.tagName}`}</h4>
                </div>
              ))}
            </>
          )}
        </div>
        <hr className={styles.hr} />
        <div className={styles.showMore}>
          {noTag ? (
            ''
          ) : (
            <>
              <Link
                to={{
                  pathname: `/analysis/${
                    activeTab === 0
                      ? 'week'
                      : activeTab === 1
                        ? 'month'
                        : 'year'
                  }`,
                  search: `start=${urlStartDate}&end=${urlEndDate}`,
                }}
                className={styles.showMoreStrContainer}
              >
                <span className={styles.showMoreStr}>자세히 보기</span>
                <RightChevron />
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.aiChartBox}>
        <div className={styles.chartTitleBox}>
          <h2 className={styles.chartTitle}>자주 대화한 상대</h2>
          <div className={styles.chartPeriodContainer}>
            <p className={styles.chartPeriod}>
              {parseDate(startDate ? startDate : new Date(), false)}
            </p>
            <p className={styles.chartPeriod}>~</p>
            <p className={styles.chartPeriod}>
              {parseDate(endDate ? endDate : new Date(), false)}
            </p>
          </div>
        </div>
        <div className={styles.horizonsContainer}>
          {aiData.map((data, index) => (
            <div key={index} className={styles.horizonBox}>
              <div className={styles.aiProfileWrapper}>
                {data.sender === 'DADA' ? (
                  data.chatCount !== 0 ? (
                    <Dada48 />
                  ) : (
                    <DadaCrying />
                  )
                ) : data.sender === 'LULU' ? (
                  data.chatCount !== 0 ? (
                    <Lulu48 />
                  ) : (
                    <LuluCrying />
                  )
                ) : data.chatCount !== 0 ? (
                  <Chichi48 />
                ) : (
                  <ChichiCrying />
                )}
                <span className={styles.aiName}>
                  {data.sender === 'DADA'
                    ? '다다'
                    : data.sender === 'LULU'
                      ? '루루'
                      : '치치'}
                </span>
              </div>
              <div className={styles.barWrapper}>
                <div className={styles.greyBar}>
                  <div
                    className={styles.orangeBar}
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <p
                  className={styles.aiPortionNumber}
                >{`${data.percentage}%`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav page={2} />
    </>
  );
};
