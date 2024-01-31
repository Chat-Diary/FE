import { useEffect, useState } from 'react';
import { Chichi48, Dada48, Lulu48, Notice, RightChevron } from '../../assets';
import BottomNav from '../../components/common/BottomNav/BottomNav';
import styles from './Analysis.module.scss';
import HomeHeader from '../../components/common/Header/Header';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getFrequentAis, getFrequentTags } from '../../apis/analysisApi';

interface frequentAiType {
  sender: string;
  chatCount: number;
  percentage: number;
}

export const Analysis = () => {
  const userId = 1; // 로그인 미구현 예상 -> 일단 1로 지정

  const periodTab = ['이번 주', '이번 달', '올해'];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    console.log(aiData);
  };

  const [tagData, setTagData] = useState([]);
  const [aiData, setAiData] = useState<frequentAiType[]>([]);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const { isLoading, error, data } = useQuery({
    queryKey: ['user_id', 'type', 'date'],
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

      return [
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

        if (tagsData) {
          setTagData(tagsData.slice(0, 3));
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
  }, [data]);

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
      {/* <div className={styles.tagChartBox}>
        <div className={styles.chartTitleBox}>
          <h2 className={styles.chartTitle}>자주 썼던 태그</h2>
          <p className={styles.chartPeriod}>2023.10.09 ~ 2023.10.16</p>
        </div>
        <div className={styles.barsBox}>
          {periodData.map((data, index) => (
            <div key={index} className={styles.barWrapper}>
              <span className={styles.portionNumber}>{data.percentage}%</span>
              <div
                className={styles.bar}
                style={{ height: `${200 * data.percentage}px` }}
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
      </div> */}
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
