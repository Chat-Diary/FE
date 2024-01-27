/* eslint-disable react/jsx-key */
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import styles from './Detail.module.scss';
import DetailHeader from '../../components/common/Header/DetailHeader/DetailHeader';

import {
  Dada36,
  Chichi36,
  Lulu36,
  DetailPlus,
  DetailSlider,
} from '../../assets/index';
import TagChip from '../../components/Tag/AllTags/TagChip';
import { useEffect, useState } from 'react';
import DetailPlusModal from '../../components/common/BottomSheets/DatailPlus/DetailPlusModal';
import DiaryDeleteDialog from '../../components/common/Dialog/DiaryDeleteDialog/DiaryDeleteDialog';
import { useQuery } from 'react-query';

interface IProp {
  // 임시로 테스트 위해 모든 프로퍼티 선택형으로 선언
  userId?: number;
  diaryId?: number;
  diaryDate?: string;
}

const img36 = [<Dada36 key={0} />, <Chichi36 key={1} />, <Lulu36 key={2} />];
const imgDiary = [
  <DetailSlider key={0} />,
  <DetailSlider key={1} />,
  <DetailSlider key={2} />,
];

const Detail = ({ userId, diaryId, diaryDate }: IProp) => {
  const navigate = useNavigate();
  const tags = [''];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderLength = imgDiary.length;

  const [isPlusSelected, setIsPlusSelected] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const onChangeEdit = () => {
    navigate('/detail/edit');
    console.log('편집 버튼 클릭');
  };

  const onClickPlus = () => {
    setIsPlusSelected((prev) => !prev);
    console.log(isPlusSelected);
  };

  const onClickClose = () => {
    setIsModalOpen(false);
    setIsPlusSelected(false);
  };

  useEffect(() => {
    userId = 1;
    diaryDate = '2024-01-03';
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['user_id', 'diary_date'],
    queryFn: () =>
      fetch(
        `http://3.35.247.53:8080/diary/detail?user_id=${userId}&diary_date=${diaryDate}`,
      ).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) console.log(data);

  return (
    <>
      <DetailHeader onClick={onChangeEdit}>2023년 11월 12일</DetailHeader>
      <div className={styles.detailContainer}>
        <div className={styles.header}>
          <div>
            {img36[0]}
            <span>{data.title}</span>
          </div>
          <DetailPlus onClick={onClickPlus} />
        </div>
        <div className={styles.content}>
          <div className={styles.sliderContainer}>
            <Slider {...settings} className={styles.slider}>
              {imgDiary.map((img, index) => (
                <div key={index} className={styles.img}>
                  {img}
                </div>
              ))}
            </Slider>
            <div className={styles.index}>
              {currentSlide + 1} / {sliderLength}
            </div>
          </div>

          <span>{data.content}</span>
          <div className={styles.tags}>
            {tags.map((tag) => {
              return <TagChip>{tag}</TagChip>;
            })}
          </div>
        </div>
      </div>
      {isPlusSelected && !isModalOpen ? (
        <DetailPlusModal
          clickOuter={() => setIsPlusSelected(false)}
          clickDelete={() => setIsModalOpen(true)}
          isOpen={isPlusSelected && !isModalOpen}
        />
      ) : (
        ''
      )}
      {isModalOpen ? (
        <DiaryDeleteDialog
          onClickCancel={onClickClose}
          onClickConfirm={() => {
            onClickClose;
            navigate('/');
          }}
          isOpen={isModalOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Detail;
