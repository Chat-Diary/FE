import React, { useState } from 'react';
import AllTags from '../../../../components/Tag/AllTags/AllTags';
import ChangeHeader from '../../../../components/common/Header/ChangeHeader/ChangeHeader';
import { useLocation, useSearchParams } from 'react-router-dom';

const SelectTag = () => {
  const [searchParams] = useSearchParams();
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const diaryDate = searchParams.get('diary_date');

  const location = useLocation();
  const [currentTags, setCurrentTags] = useState<string[]>(location.state);

  return (
    <>
      <ChangeHeader>태그 선택하기</ChangeHeader>
      <AllTags currentTags={currentTags} isInit={false} />
    </>
  );
};

export default SelectTag;
