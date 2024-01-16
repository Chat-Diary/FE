import React, { useRef } from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import InputForm from '../../components/Input/InputForm';
import DetailTag from '../../components/tags/DetailTag';

import { DetailCamera, DetailSlider } from '../../assets/index';
import ConfirmButton from '../../components/Buttons/ConfirmButton';

const DetailEditing = () => {
  const imgInput = useRef<HTMLInputElement>(null);
  const imgDiary = [
    <DetailSlider key={0} />,
    <DetailSlider key={1} />,
    <DetailSlider key={2} />,
  ];
  const tags = [
    '기쁨',
    '식당',
    '초면',
    '학교',
    '카페',
    '선후배',
    '공부',
    '기쁨',
    '식당',
    '초면',
    '학교',
    '카페',
    '선후배',
    '공부',
  ];

  const handleImgAdd = () => {
    if (imgInput.current) {
      imgInput.current.click();
    }
  };

  const handleTagClick = () => {
    console.log('태그 선택 클릭');
  };

  const handleSave = () => {
    console.log('저장 버튼 클릭');
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
            <label className={styles.addImg}>
              <input
                ref={imgInput}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
              />
              <DetailCamera onClick={handleImgAdd} />
            </label>
            {/* {imgDiary.map((img, index) => (
              <div key={index} className={styles.img}>
                {img}
              </div>
            ))} */}
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
      <div className={styles.btn}>
        <ConfirmButton isAble={true} id={0} onClick={handleSave}>
          저장하기
        </ConfirmButton>
      </div>
    </>
  );
};

export default DetailEditing;
