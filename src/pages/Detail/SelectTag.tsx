import React from 'react';
import AllTags from '../../components/Tags/AllTags';
import ChangeHeader from '../../components/Headers/ChangeHeader';

const SelectTag = () => {
  return (
    <>
      <ChangeHeader>태그 선택하기</ChangeHeader>
      <AllTags index={[]} isInit={false} />
    </>
  );
};

export default SelectTag;
