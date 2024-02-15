import React, { useState, useEffect } from 'react';
import AllTags from '../../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../../components/common/Header/ChangeHeader/ChangeHeader';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DiaryDetailType } from '../../../../apis/diaryDetailApi';
import { TagFilterInfo } from '../../../../assets';
import styles from './SelectTag.module.scss';

const SelectTag = () => {
  const [searchParams] = useSearchParams();
  // const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const diaryDate = searchParams.get('diary_date');

  const location = useLocation();
  const [newData, setNewData] = useState<DiaryDetailType>(
    location.state.detailData,
  );
  const [isLimited, setIsLimited] = useState<boolean>(false);

  useEffect(() => {
    if (newData.tagName) {
      if (newData.tagName.length >= 10) {
        setIsLimited(true);
      } else {
        setIsLimited(false);
      }
    }
  }, [newData.tagName]);

  return (
    <>
      <ChangeHeader
        path={`/detail/modify?diary_date=${diaryDate}`}
        state={newData}
      >
        태그 선택하기
      </ChangeHeader>
      <div className={styles.tagLimitText}>
        <div className={styles.infoIcon}>
          <TagFilterInfo />
        </div>
        <div>일기를 표현할 수 있는 태그를 선택해주세요!(최대 10개)</div>
      </div>
      <AllTags
        currentTags={newData.tagName ? newData.tagName : []}
        setNewTags={setNewData}
        isInit={false}
        isLimit={isLimited}
      />
    </>
  );
};

export default SelectTag;
