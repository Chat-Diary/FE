/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Chichi48, Dada48, Lulu48, Notice, RightChevron } from '../../assets';
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

export const Analysis = () => {
  const userId = 1; // 로그인 미구현 예상 -> 일단 1로 지정

  const periodTab = ['이번 주', '이번 달', '올해'];
  const [activeTab, setActiveTab] = useState(0);

  // const today = new Date();
  // const year: number = today.getFullYear();
  // const month: number = today.getMonth() + 1;
  // const date: number = today.getDate();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    console.log(tagData);
  };

  const [tagData, setTagData] = useState<frequentTagType[]>([]);
  const [aiData, setAiData] = useState<frequentAiType[]>([]);

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

      // const currentDate =
      //   year +
      //   '-' +
      //   month.toString().padStart(2, '0') +
      //   '-' +
      //   date.toString().padStart(2, '0');
      // console.log(currentDate);

      return [
        // getFrequentTags(userId, type, currentDate),
        getFrequentTags(userId, type, '2024-01-02'),
        getFrequentAis(userId, type, '2024-01-02'),
      ];
    },
  });

  useEffect(() => {
    if (data) {
      Promise.all(data).then(([tagsData, aisData]) => {
        // 기본 캐릭터 정보
        const defaultAi = [
          { sender: 'DADA', chatCount: 0, percentage: 0 },
          { sender: 'CHICHI', chatCount: 0, percentage: 0 },
          { sender: 'LULU', chatCount: 0, percentage: 0 },
        ];

        if (tagsData && tagsData.length >= 3) {
          setTagData((prev) => {
            const slicedTagsData = tagsData.slice(0, 3);

            // timestamp 형식에서 YYYY년 MM월 DD일 형식으로 바꾸기 위함
            const startObject = new Date(slicedTagsData[0].startDate);
            setStartDate(startObject);
            const endObject = new Date(slicedTagsData[0].endDate);
            setEndDate(endObject);

            return slicedTagsData;
          });
        }

        if (aisData) {
          const aiSlice = aisData
            .slice(1)
            .map(({ sender, chatCount, percentage }: frequentAiType) => ({
              sender,
              chatCount,
              percentage,
            }));

          // aiComplete에 defaultAi에 없는 원소만 추가
          const aiComplete = [...aiSlice];

          defaultAi.forEach((c) => {
            if (!aiSlice.some((ai: frequentAiType) => ai.sender === c.sender)) {
              aiComplete.push(c);
            }
          });

          setAiData(aiComplete);
        }
      });
    }
  }, [data, activeTab]);

  // activeTab이 변경될 때마다 refetch 호출
  useEffect(() => {
    refetch();
  }, [activeTab]);

  if (isLoading) return <div>Loading...</div>;

  if (error) console.log(error);

  return (
    <>
      <HomeHeader />
      <div className={styles.notice}>
        <Notice />
        <span className={styles.streak}>
          꾸준히 일기를 쓴 지
          <span className={styles.streakNumber}> 7일째 </span>
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
          <h2 className={styles.chartTitle}>자주 썼던 태그</h2>
          <div className={styles.chartPeriodContainer}>
            <p className={styles.chartPeriod}>
              {startDate?.getFullYear()}년{' '}
              {startDate?.getMonth() !== undefined && startDate?.getMonth() + 1}
              월 {startDate?.getDate()}일
            </p>
            <p className={styles.chartPeriod}>~</p>
            <p className={styles.chartPeriod}>
              {endDate?.getFullYear()}년{' '}
              {endDate?.getMonth() !== undefined && endDate.getMonth() + 1}월{' '}
              {endDate?.getDate()}일
            </p>
          </div>
        </div>
        <div className={styles.barsBox}>
          {tagData.map((data, index) => (
            <div key={index} className={styles.barWrapper}>
              <span className={styles.portionNumber}>{data.percentage}%</span>
              <div
                className={styles.bar}
                style={{
                  height: `${(data.percentage / tagData[0].percentage) * 100}%`,
                }}
              ></div>
              <h4 className={styles.tagName}>{`#${data.tagName}`}</h4>
            </div>
          ))}
        </div>
        <hr className={styles.hr} />
        <div className={styles.showMore}>
          <Link
            to={{
              pathname: `/analysis/${
                activeTab === 0 ? 'week' : activeTab === 1 ? 'month' : 'year'
              }`,
            }}
            className={styles.showMoreStrContainer}
          >
            <span className={styles.showMoreStr}>자세히 보기</span>
            <RightChevron />
          </Link>
        </div>
      </div>
      {/* <div className={styles.aiChartBox}>
        <div className={styles.chartTitleBox}>
          <h2 className={styles.chartTitle}>가장 많이 대화한 상대</h2>
          <p className={styles.chartPeriod}>2023.10.09 ~ 2023.10.16</p>
        </div>
        <div className={styles.horizonsContainer}>
          {aiData.map((data, index) => (
            <div key={index} className={styles.horizonBox}>
              <div className={styles.aiProfileWrapper}>
                {data.name === '다다' ? (
                  <Dada48 />
                ) : data.name === '루루' ? (
                  <Lulu48 />
                ) : (
                  <Chichi48 />
                )}
                <span className={styles.aiName}>{data.name}</span>
              </div>
              <div className={styles.barWrapper}>
                <div className={styles.greyBar}>
                  <div
                    className={styles.orangeBar}
                    style={{ width: `${100 * data.portion}%` }}
                  ></div>
                </div>
                <p className={styles.aiPortionNumber}>{`${
                  data.portion * 100
                }%`}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <BottomNav page={2} />
    </>
  );
};
