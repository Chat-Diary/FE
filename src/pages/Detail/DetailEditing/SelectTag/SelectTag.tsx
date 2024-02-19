import React, { useState, useEffect } from 'react';
import styles from './SelectTag.module.scss';
import AllTags from '../../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../../components/common/Header/ChangeHeader/ChangeHeader';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { DiaryDetailType } from '../../../../apis/diaryDetailApi';
import { TagFilterInfo } from '../../../../assets';
import ConfirmButton from '../../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { isLogin } from '../../../../utils/user';

const SelectTag = () => {
  isLogin();
  const [searchParams] = useSearchParams();
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
        state={location.state.detailData}
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

      <Link
        className={`${styles.confirmBtn} ${
          newData.tagName?.length === 0 ? '' : styles.abled
        }
          }`}
        to={`/detail/modify?diary_date=${diaryDate}`}
        state={{ detailData: newData }}
      >
        <ConfirmButton
          isAble={newData.tagName?.length === 0 ? false : true}
          id={0}
        >
          저장하기
        </ConfirmButton>
      </Link>
    </>
  );
};

export default SelectTag;
