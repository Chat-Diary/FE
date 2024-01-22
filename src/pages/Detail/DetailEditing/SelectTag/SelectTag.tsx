import React from 'react';
import AllTags from '../../../../components/Tags/AllTags';
import ChangeHeader from '../../../../components/Headers/ChangeHeader';

const SelectTag = () => {
  return (
    <>
      <ChangeHeader>태그 선택하기</ChangeHeader>
      <AllTags
        index={[
          { category: '감정', index: [0, 3, 4] },
          { category: '인물', index: [0] },
          { category: '행동', index: [0, 3, 4, 5] },
          { category: '장소', index: [0, 3, 4, 5] },
        ]}
        isInit={false}
      />
    </>
  );
};

export default SelectTag;
