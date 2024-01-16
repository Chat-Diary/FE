import React from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import InputForm from '../../components/Input/InputForm';
import DetailTag from '../../components/tags/DetailTag';

const DetailEditing = () => {
  const tags = ['기쁨', '식당', '초면', '학교', '카페', '선후배', '공부'];

  const handleTagClick = () => {
    console.log('태그 선택 클릭');
  };

  return (
    <>
      <ChangeHeader>일기 수정하기</ChangeHeader>
      <div className={styles.wholeWrapper}>
        <div className={styles.header}>
          <div>2023 11월 12일</div>
          <InputForm length={44} placeHolder={'이름을 입력해주세요'} />
        </div>
        <div className={styles.content}>
          <div>사진 첨부하기</div>
          <div className={styles.imgContainer}>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png"
              className={styles.addImg}
            />
          </div>
          <InputForm length={240} placeHolder={'내용을 입력해주세요'} />
          <div className={styles.tagSelect} onClick={handleTagClick}>
            <div>태그 선택하기</div>
            <div className={styles.tags}>
              {tags.map((tag) => {
                // eslint-disable-next-line react/jsx-key
                return <DetailTag>{tag}</DetailTag>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailEditing;
