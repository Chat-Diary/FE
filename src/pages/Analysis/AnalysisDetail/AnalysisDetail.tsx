import styles from './AnanlysisDetail.module.scss';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import { useLocation, useParams } from 'react-router-dom';
import BottomNav from '../../../components/common/BottomNav/BottomNav';
import { useState } from 'react';

const AnalysisDetail = () => {
  const { period } = useParams<{
    period: string;
  }>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const start = queryParams.get('start');
  const end = queryParams.get('end');

  const currentData = location.state.tagData;

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // UI 상에서 파싱된 날짜 보여주기 위한 함수
  const parseDate = (d: string) => {
    const date = new Date(d);
    console.log(start);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const parsedDate = year + '년 ' + month + '월 ' + day + '일';

    return parsedDate;
  };

  if (period === undefined || !['week', 'month', 'year'].includes(period)) {
    return <p>잘못된 페이지입니다.</p>;
  }

  return (
    <>
      <ChangeHeader>{`${
        period === 'week' ? '주간' : period === 'month' ? '월간' : '연간'
      } 차트`}</ChangeHeader>
      <div className={styles.chartTitleBox}>
        <h2 className={styles.chartTitle}>{`${
          period === 'week'
            ? '이번 주'
            : period === 'month'
              ? '이번 달'
              : '올해'
        }에 자주 썼던 태그`}</h2>
        <div className={styles.chartPeriodContainer}>
          <p className={styles.chartPeriod}>
            {parseDate(start !== null ? start : '')}
          </p>
          <p className={styles.chartPeriod}>~</p>
          <p className={styles.chartPeriod}>
            {parseDate(end !== null ? end : '')}
          </p>
        </div>
      </div>
      <div className={styles.tagTabsContainer}>
        {['전체', '감정', '행동', '장소', '인물'].map((category, index) => (
          <button
            key={index}
            className={`${styles.tabBtn} ${
              index === activeTab ? styles.activeTabBtn : styles.inactiveTabBtn
            }`}
            onClick={() => handleTabClick(index)}
          >
            {category}
          </button>
        ))}
      </div>

      <BottomNav page={2} isBtn={false} />
    </>
  );
};

export default AnalysisDetail;
