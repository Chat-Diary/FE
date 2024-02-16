/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useRef, useState } from 'react';
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
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = 1; // 로그인 미구현 시 초기화

  // 서버에 formData 형식으로 넘기기 위한 formData 객체
  const [formData, setFormData] = useState<FormData>(new FormData());

  // 이전 화면에서 받아온 일기 상세 정보
  const location = useLocation();
  const currentData = location.state.detailData;
  const currentDate = currentData.diaryDate;
  const currentTitle = currentData.title;
  const [currentImgs, setCurrentImgs] = useState<string[]>(currentData.imgUrl);
  const currentContent = currentData.content;
  const currentTags = currentData.tagName;

  // 편집 화면으로 넘길 일기 상세 정보 (수정 중인 데이터)
  const [newData, setNewData] = useState<DiaryDetailType>({
    userId: userId, // userId는 현재 사용자의 ID로 설정
    diaryDate: currentData.diaryDate,
    title: currentData.title || '', // 제목이 없을 경우 빈 문자열로 초기화
    imgUrl: currentData.imgUrl, // imgUrl 초기화
    content: currentData.content || '', // 내용이 없을 경우 빈 문자열로 초기화
    tagName: currentData.tagName || [], // 태그명이 없을 경우 빈 배열로 초기화
    deleteImgUrls: [], // 삭제된 이미지 URL이 없을 경우 빈 배열로 초기화
    newImgUrls: [], // newImgUrls 초기화
  });

  // YYYY년 MM월 DD일 표시 위함
  const [formattedDate, setFormattedDate] = useState<string>('');

  // 제목 및 내용 미입력시 저장 비활성화 위함
  const [titleCount, setTitleCount] = useState<number>(currentTitle.length);
  const [contentCount, setContentCount] = useState<number>(
    currentContent.length,
  );
  const [isAble, setIsAble] = useState<boolean>(true);

  // 이미지 추가 위함
  const imgInput = useRef<HTMLInputElement>(null);
  const [selectedImgs, setSelectedImgs] = useState<File[]>(
    currentData.newImgFile || [],
  );

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target!.files;
    if (files) {
      const newImg: File[] = Array.from(files);
      setSelectedImgs((prev) => [newImg[0], ...prev]);

      // formData에 파일 추가
      formData.append('image', newImg[0], newImg[0].name);
    }
  };

  const handleImgDel = (index: number) => {
    // 클릭된 index의 이미지를 배열에서 제외
    const allImages = [...selectedImgs, ...currentImgs];

    if (allImages[index] instanceof File) {
      // 만약 클릭된 이미지가 File 형태인 경우
      setSelectedImgs((prev) =>
        prev.filter((_, imgIndex) => imgIndex !== index),
      );
    } else if (typeof allImages[index] === 'string') {
      // 만약 클릭된 이미지가 URL 형태인 경우
      setCurrentImgs((prev) =>
        prev.filter((_, imgIndex) => imgIndex !== index),
      );
    }

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
    // console.log(newData);
    // formData.forEach((value, key) => {
    //   console.log(`${key}: `, value);
    // });
    // imgUrl과 newImgFile 속성 제외한 새로운 객체 생성
    const newDataWithoutImgFile = { ...newData };
    delete newDataWithoutImgFile.imgUrl;
    delete newDataWithoutImgFile.newImgFile;

    // tagName 키를 tagNames로 변경
    const newDataWithRenamedTagNames = {
      ...newDataWithoutImgFile,
      tagNames: newDataWithoutImgFile.tagName,
    };
    delete newDataWithRenamedTagNames.tagName;

    const jsonData = JSON.stringify(newDataWithRenamedTagNames);
    const jsonBlob = new Blob([jsonData], {
      type: 'application/json',
    });

    formData.append('request', jsonBlob);

    mutate(formData);
    navigator(`/detail?diary_date=${currentDate}`);
  };

  useEffect(() => {
    // 날짜 fetching
    const d = new Date(currentDate ? currentDate : '');
    const date = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
    setFormattedDate(date);

    // 버튼 비활성화 설정
    if (titleCount === 0 || contentCount === 0) {
      setIsAble(false);
    } else {
      setIsAble(true);
    }
  });

  useEffect(() => {
    if (selectedImgs.length > 0) {
      setNewData((prev) => {
        return {
          ...prev,
          newImgFile: selectedImgs,
        };
      });
    }
  }, [selectedImgs]);

  useEffect(() => {
    setNewData((prev) => {
      return { ...prev, imgUrl: currentImgs };
    });
  }, [currentImgs]);

  const { mutate, isLoading } = useMutation((value: FormData) =>
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
          <div>{formattedDate}</div>
          <InputForm
            length={44}
            placeHolder={'제목을 입력해주세요'}
            value={currentTitle}
            setCount={setTitleCount}
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
                onChange={handleChangeImg}
                style={{ display: 'none' }}
              />
              <DetailCamera />
            </label>
            {[...selectedImgs, ...currentImgs].map((img, key) => (
              <div key={key} className={styles.img}>
                <img
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                />
                <div className={styles.imgDel}>
                  <DetailImgDelete onClick={() => handleImgDel(key)} />
                </div>
              </div>
            ))}
          </div>
          <InputForm
            length={240}
            placeHolder={'내용을 입력해주세요'}
            value={currentContent}
            setCount={setContentCount}
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
        <ConfirmButton isAble={isAble} id={0} onClick={handleSave}>
          저장하기
        </ConfirmButton>
      </div>
    </>
  );
};

export default DetailEditing;
