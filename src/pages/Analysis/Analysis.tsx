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

export const Analysis = () => {
  const userId = 1; // 로그인 미구현 예상 -> 일단 1로 지정

  const [tagData, setTagData] = useState<frequentTagType[]>([]);
  const [aiData, setAiData] = useState<frequentAiType[]>([]);
  const [noTag, setNoTag] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const periodTab = ['이번 주', '이번 달', '올해'];
  const [activeTab, setActiveTab] = useState(0);

  const today = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1;
  const date: number = today.getDate();

  // UI 상에서 파싱된 날짜 보여주기 위한 함수
  const parseDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const parsedDate = year + '년 ' + month + '월 ' + day + '일';
    return parsedDate;
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    console.log(tagData);
    console.log(aiData);
  };

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

      const currentDate =
        year +
        '-' +
        month.toString().padStart(2, '0') +
        '-' +
        date.toString().padStart(2, '0');
      console.log(currentDate);

      return [
        getFrequentTags(userId, type, currentDate),
        getFrequentAis(userId, type, currentDate),
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
          setTagData((prev) => {
            const slicedTagsData = tagsData.slice(0, 3);
            if (slicedTagsData.length === 0) {
              setNoTag(true);
              return 0;
            }

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
            .slice(1) // sender 제외하는 걸로 수정 완료되면 바꿀 예정
            .map(({ sender, chatCount, percentage }: frequentAiType) => ({
              sender,
              chatCount,
              percentage,
            }));

          // aiComplete에 defaultAi에 없는 원소만 추가 -> api 수정 완료되면 바꿀 예정
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
              {parseDate(startDate !== undefined ? startDate : today)}
            </p>
            <p className={styles.chartPeriod}>~</p>
            <p className={styles.chartPeriod}>
              {parseDate(endDate !== undefined ? endDate : today)}
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
                }}
                state={{ tagData: tagData }}
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
          <h2 className={styles.chartTitle}>가장 많이 대화한 상대</h2>
          <div className={styles.chartPeriodContainer}>
            <p className={styles.chartPeriod}>
              {parseDate(startDate !== undefined ? startDate : today)}
            </p>
            <p className={styles.chartPeriod}>~</p>
            <p className={styles.chartPeriod}>
              {parseDate(endDate !== undefined ? endDate : today)}
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
