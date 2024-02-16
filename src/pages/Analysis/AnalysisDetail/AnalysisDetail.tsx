/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './AnanlysisDetail.module.scss';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import { useLocation, useParams } from 'react-router-dom';
import BottomNav from '../../../components/common/BottomNav/BottomNav';
import { useEffect, useState } from 'react';
import TagRankingItem from '../../../components/Analysis/TagRankingItem';
import { useQuery } from 'react-query';
import { getTagDetailRanking } from '../../../apis/analysisApi';
import { TagCounts, TagDetailRanking } from '../../../utils/analysisDetail';

const AnalysisDetail = () => {
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const { period } = useParams<{
    period: string;
  }>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const start = queryParams.get('start');
  const end = queryParams.get('end');

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const [tagDetailRanking, setTagDetailRanking] = useState<TagDetailRanking>();
  const categoryList = ['전체', '감정', '행동', '장소', '인물'];
  const [tagCountsData, setTagCountsData] = useState<TagCounts[]>();

  // UI 상에서 파싱된 날짜 보여주기 위한 함수
  const parseDate = (d: string) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const parsedDate = year + '년 ' + month + '월 ' + day + '일';

    return parsedDate;
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['user_id', 'diary_date'],
    queryFn: () => {
      let type = '';
      switch (period) {
        case 'week':
          type = 'weekly';
          break;
        case 'month':
          type = 'monthly';
          break;
        case 'year':
          type = 'yearly';
          break;
      }

      return getTagDetailRanking(userId, type);
    },
  });

  useEffect(() => {
    if (data) {
      setTagDetailRanking(data);
    }
  }, [data]);

  useEffect(() => {
    let tagCounts: TagCounts[];
    switch (activeTab) {
      case 0:
        tagCounts = tagDetailRanking?.statistics.전체 || [];
        setTagCountsData(tagCounts);
        break;
      case 1:
        tagCounts = tagDetailRanking?.statistics.감정 || [];
        setTagCountsData(tagCounts);
        break;
      case 2:
        tagCounts = tagDetailRanking?.statistics.행동 || [];
        setTagCountsData(tagCounts);
        break;
      case 3:
        tagCounts = tagDetailRanking?.statistics.장소 || [];
        setTagCountsData(tagCounts);
        break;
      case 4:
        tagCounts = tagDetailRanking?.statistics.인물 || [];
        setTagCountsData(tagCounts);
        break;
    }
  }, [tagDetailRanking, activeTab]);

  // activeTab이 변경될 때마다 refetch 호출
  useEffect(() => {
    refetch();
  }, [activeTab]);

  if (isLoading) {
    return <>loading..</>;
  }

  if (error) console.log('AnalysisDetail error : ', error);

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
          <p className={styles.chartPeriod}>{parseDate(start ? start : '')}</p>
          <p className={styles.chartPeriod}>~</p>
          <p className={styles.chartPeriod}>{parseDate(end ? end : '')}</p>
        </div>
      </div>
      <div className={styles.tagTabsContainer}>
        {categoryList.map((category, index) => (
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
      {tagCountsData &&
        tagCountsData.map((data, index) => {
          return <TagRankingItem key={index} rank={index + 1} tagData={data} />;
        })}
      <BottomNav page={2} isBtn={false} />
    </>
  );
};

export default AnalysisDetail;
