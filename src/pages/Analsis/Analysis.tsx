import { useState } from 'react';
import { Notice, RightChevron } from '../../assets';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './Analysis.module.scss';

export const Analysis = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tagsData = [
    { portion: 0.85, name: '기쁨' },
    {
      portion: 0.35,
      name: '설렘',
    },
    {
      portion: 0.11,
      name: '피곤함',
    },
  ];
  const [periodData, setperiodData] = useState(tagsData);
  return (
    <>
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
          <div className={styles.showMoreStrContainer}>
            <span className={styles.showMoreStr}>자세히 보기</span>
            <RightChevron />
          </div>
        </div>
      </div>
      <BottomNav page={2} />
    </>
  );
};
