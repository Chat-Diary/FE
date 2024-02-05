/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import InputForm from '../../../components/common/Input/InputForm';
import TagChip from '../../../components/Tag/AllTags/TagChip';

import { DetailCamera, DetailImgDelete } from '../../../assets/index';
import ConfirmButton from '../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import {
  DiaryDetailType,
  modifyDiaryDetail,
} from '../../../apis/diaryDetailApi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const DetailEditing = () => {
  // const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = 1; // 로그인 미구현 예상 -> 일단 상수값으로 지정
  const diaryDate = searchParams.get('diary_date');

  // 이전 화면에서 받아온 일기 상세 정보
  const location = useLocation();
  const currentData = location.state.detailData;
  const currentDate = currentData.diaryDate;
  const currentTitle = currentData.title;
  const [currentImgs, setCurrentImgs] = useState<string[]>(currentData.imgUrl);
  const currentContent = currentData.content;
  const [currentTags, setCurrentTags] = useState<string[]>(currentData.tagName);

  // 편집 화면으로 넘길 일기 상세 정보 (수정 중인 데이터)
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

    // 삭제된 이미지의 url
    setNewData((prev) => {
      const imageUrlToRemove = currentImgs[index];

      // 화면 간 데이터 이동 시 url의 중복 추가 피하기 위함
      const isUrlAlreadyAdded = (prev.deleteImgUrls || []).some(
        (url) => url === imageUrlToRemove,
      );

      // 만약 해당 URL이 이미 추가되어 있지 않다면 추가
      if (!isUrlAlreadyAdded) {
        return {
          ...prev,
          deleteImgUrls: [...(prev.deleteImgUrls || []), imageUrlToRemove],
        };
      }

      // 이미 추가된 경우 그대로 반환
      return prev;
    });
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
    console.log(newData);
    console.log(currentImgs);
    // mutate(newData);
  };

  useEffect(() => {
    setNewData((prev) => {
      return { ...prev, imgUrl: currentImgs };
    });
  }, [currentImgs]);

  const { mutate, isLoading } = useMutation((value: DiaryDetailType) =>
    modifyDiaryDetail(value),
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ChangeHeader path={`/detail?${searchParams}`}>
        일기 수정하기
      </ChangeHeader>
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
            state={{ detailData: newData }}
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
