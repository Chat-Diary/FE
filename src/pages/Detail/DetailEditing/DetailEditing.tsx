import React, { useRef, useState } from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import InputForm from '../../../components/common/Input/InputForm';
import TagChip from '../../../components/Tag/AllTags/TagChip';

import { DetailCamera, DetailImgDelete } from '../../../assets/index';
import ConfirmButton from '../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  DiaryDetailType,
  modifyDiaryDetail,
} from '../../../apis/diaryDetailApi';
import { Link } from 'react-router-dom';

const DetailEditing = () => {
  // const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const diaryDate = searchParams.get('diary_date');

  const location = useLocation();
  const currentData = location.state.detailData;
  const currentDate = currentData.diaryDate;
  const currentTitle = currentData.title;
  const [currentImgs, setCurrentImgs] = useState<string[]>(currentData.imgUrl);
  const currentContent = currentData.content;
  const currentTags = currentData.tagName;

  const [newData, setNewData] = useState<DiaryDetailType>(currentData);

  const imgInput = useRef<HTMLInputElement>(null);

  const handleImgAdd = () => {
    if (imgInput.current) {
      imgInput.current.click();
    }
  };

  const handleImgDel = (index: number) => {
    // 클릭된 index의 이미지를 배열에서 제외
    setCurrentImgs((prev) =>
      prev.filter((img, imgIndex) => imgIndex !== index),
    );

    setNewData((prev) => ({
      ...prev,
      imgUrl: prev.imgUrl.filter((img, imgIndex) => imgIndex !== index),
    }));
  };

  const handleTitle = (value: string) => {
    setNewData((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleContent = (value: string) => {
    setNewData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSave = () => {
    console.log(currentData);
    console.log(newData);
  };

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['user_id', 'diary_date'],
  //   queryFn: () => modifyDiaryDetail(userId, diaryDate!, currentData.title),
  // });

  // if (isLoading) return <div>Loading...</div>;

  // if (error) console.log(error);

  return (
    <>
      <ChangeHeader>일기 수정하기</ChangeHeader>
      <div className={styles.wholeWrapper}>
        <div className={styles.header}>
          <div>{currentDate}</div>
          <InputForm
            length={44}
            placeHolder={'이름을 입력해주세요'}
            value={currentTitle}
            onSave={handleTitle}
          />
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
            {currentImgs.map((img: string, key: number) => (
              <>
                <div key={key} className={styles.img}>
                  <img src={img} />
                  <div className={styles.imgDel}>
                    <DetailImgDelete onClick={() => handleImgDel(key)} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <InputForm
            length={240}
            placeHolder={'내용을 입력해주세요'}
            value={currentContent}
            onSave={handleContent}
          />
          <Link
            to={`/detail/modify/tags?diary_date=${currentDate}`}
            state={{ tagsData: currentTags }}
          >
            <div className={styles.tagSelect}>
              <div>태그 선택하기</div>
              <div className={styles.tags}>
                {currentTags.map((tag: string, key: number) => {
                  return <TagChip key={key}>{tag}</TagChip>;
                })}
              </div>
            </div>
          </Link>
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
