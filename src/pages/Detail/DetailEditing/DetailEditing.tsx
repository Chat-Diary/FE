import React, { useRef, useState } from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../../components/common/Header/ChangeAiHeader/ChangeHeader';
import InputForm from '../../../components/common/Input/InputForm';
import TagChip from '../../../components/Tag/AllTags/TagChip';

import {
  DetailCamera,
  DetailEditImg,
  DetailImgDelete,
} from '../../../assets/index';
import ConfirmButton from '../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useNavigate } from 'react-router';

const DetailEditing = () => {
  const navigator = useNavigate();

  const imgInput = useRef<HTMLInputElement>(null);
  const [imgDiary, setImgDiary] = useState([
    <DetailEditImg key={0} />,
    <DetailEditImg key={1} />,
    <DetailEditImg key={2} />,
  ]);

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

  const handleImgDel = (index: number) => {
    // 클릭된 index의 이미지를 배열에서 제외
    setImgDiary((prev) => prev.filter((img, imgIndex) => imgIndex !== index));
  };

  const handleTagClick = () => {
    // console.log('태그 선택 클릭');
    navigator('/detail/edit/tags');
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
            {imgDiary.map((img, index) => (
              <>
                <div key={index} className={styles.img}>
                  {img}
                  <div className={styles.imgDel}>
                    <DetailImgDelete onClick={() => handleImgDel(index)} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <InputForm length={240} placeHolder={'내용을 입력해주세요'} />
          <div className={styles.tagSelect} onClick={handleTagClick}>
            <div>태그 선택하기</div>
            <div className={styles.tags}>
              {tags.map((tag) => {
                // eslint-disable-next-line react/jsx-key
                return <TagChip>{tag}</TagChip>;
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
