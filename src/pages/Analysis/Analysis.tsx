import { useState } from 'react';
import { Chichi48, Dada48, Lulu48, Notice, RightChevron } from '../../assets';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './Analysis.module.scss';
import HomeHeader from '../../components/Headers/HomeHeader';
import { Link } from 'react-router-dom';

export const Analysis = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tagsData = [
    {
      portion: 0.85,
      name: '기쁨',
    },
    {
      portion: 0.35,
      name: '설렘',
    },
    {
      portion: 0.11,
      name: '피곤함',
    },
  ];
  const aisData = [
    {
      portion: 0.85,
      name: '다다',
    },
    {
      portion: 0.1,
      name: '치치',
    },
    {
      portion: 0.05,
      name: '루루',
    },
  ];
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [periodData, setperiodData] = useState(tagsData);
  const [periodData2, setperiodData2] = useState(aisData);
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
        {['이번 주', '이번 달', '올해'].map((tab, index) => (
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
          <p className={styles.chartPeriod}>2023.10.09 ~ 2023.10.16</p>
        </div>
        <div className={styles.barsBox}>
          {periodData.map((data, index) => (
            <div key={index} className={styles.barWrapper}>
              <span className={styles.portionNumber}>{`${
                data.portion * 100
              }%`}</span>
              <div
                className={styles.bar}
                style={{ height: `${200 * data.portion}px` }}
              ></div>
              <h4 className={styles.tagName}>{`#${data.name}`}</h4>
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
      <div className={styles.aiChartBox}>
        <div className={styles.chartTitleBox}>
          <h2 className={styles.chartTitle}>가장 많이 대화한 상대</h2>
          <p className={styles.chartPeriod}>2023.10.09 ~ 2023.10.16</p>
        </div>
        <div className={styles.horizonsContainer}>
          {periodData2.map((data, index) => (
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
      </div>
      <BottomNav page={2} />
    </>
  );
};
