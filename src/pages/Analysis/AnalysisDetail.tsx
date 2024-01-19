import styles from './AnanlysisDetail.module.scss';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import { useParams } from 'react-router-dom';
import BottomNav from '../../components/BottomNav/BottomNav';

const AnalysisDetail = () => {
  const { period } = useParams();

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
        <p className={styles.chartPeriod}>2023.10.09 ~ 2023.10.16</p>
      </div>
      <div className={styles.tagTabsContainer}></div>
      <BottomNav page={2} isBtn={false} />
    </>
  );
};

export default AnalysisDetail;
