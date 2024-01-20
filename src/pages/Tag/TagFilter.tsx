import React from 'react';
import AllTags from '../../components/Tags/AllTags';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import ConfirmButton from '../../components/Buttons/ConfirmButton';

const TagFilter = () => {
  const toggleInit = () => {
    console.log('초기화');
  };

  const toggleConfirm = () => {
    console.log('적용하기');
  };

  return (
    <>
      <ChangeHeader>필터 선택</ChangeHeader>
      <AllTags></AllTags>
      <ConfirmButton isAble={false} id={0} onClick={toggleInit}>
        초기화
      </ConfirmButton>
      <ConfirmButton isAble={true} id={1} onClick={toggleConfirm}>
        적용하기
      </ConfirmButton>
    </>
  );
};

export default TagFilter;
