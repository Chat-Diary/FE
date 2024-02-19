import { useNavigate, useSearchParams } from 'react-router-dom';
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
  DetailSkProfile,
} from '../../assets/index';
import TagChip from '../../components/Tag/AllTags/TagChip';
import { useEffect, useState } from 'react';
import DetailPlusModal from '../../components/common/BottomSheets/DatailPlus/DetailPlusModal';
import DiaryDeleteDialog from '../../components/common/Dialog/DiaryDeleteDialog/DiaryDeleteDialog';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteDiary, getDiaryDetail } from '../../apis/diaryDetailApi';
import { isLogin } from '../../utils/user';

const img36 = [<Dada36 key={0} />, <Chichi36 key={1} />, <Lulu36 key={2} />];

const Detail = () => {
  isLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const diaryDate = searchParams.get('diary_date');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [diaryImgs, setDiaryImgs] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [sliderLength, setSliderLength] = useState<number>(0);

  const [isImgEmpty, setIsImgEmpty] = useState<boolean>(false);
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

  const onClickPlus = () => {
    setIsPlusSelected((prev) => !prev);
    console.log(isImgEmpty);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsPlusSelected(false);
  };

  const handleConfirm = async () => {
    handleClose();

    try {
      await deleteMutation.mutateAsync();
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // 날짜 fetching
    const d = new Date(diaryDate ? diaryDate : '');
    const date = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
    setFormattedDate(date);

    if (error || !data) {
      console.log('Detail error : ', error);
      return;
    } else if (data) {
      if (data.imgUrl && data.imgUrl.length > 0) {
        // 사진 있는 경우 fetching
        setIsImgEmpty(false);
        setDiaryImgs(data.imgUrl);
        setSliderLength(data.imgUrl.length);
      } else {
        setIsImgEmpty(true);
      }

      // 태그 fetching
      setTags(data.tagName);
    }
  });

  const deleteMutation = useMutation(() => deleteDiary(diaryDate!), {
    // 삭제 요청 성공한 경우에만 실행
    onSuccess: () => {
      // 삭제된 일기 캐시 제거
      queryClient.invalidateQueries(['DIARY', 'DETAIL', diaryDate]);
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['DIARY', 'DETAIL', diaryDate],
    queryFn: () => getDiaryDetail(diaryDate!),
  });

  if (isLoading || !data)
    return (
      <>
        <DetailHeader date={diaryDate ? diaryDate : ''}>
          {formattedDate}
        </DetailHeader>
        <div className={styles.detailContainer}>
          <div className={styles.header}>
            <div>
              <DetailSkProfile />
              <div className={styles.skeletonTitle} />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.sliderContainer}>
              <Slider {...settings} className={styles.slider}>
                <div className={styles.img} />
              </Slider>
            </div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLine} />
              <div className={`${styles.skeletonLine} ${styles.lastLine}`} />
            </div>
            <div className={styles.skeletonTags}></div>
          </div>
        </div>
      </>
    );

  if (error) console.log('Detail error : ', error);

  return (
    <>
      <DetailHeader date={data.diaryDate} info={data}>
        {formattedDate}
      </DetailHeader>
      <div className={styles.detailContainer}>
        <div className={styles.header}>
          <div>
            {img36[data.characterIndex - 1]}
            <span>{data.title}</span>
          </div>
          <DetailPlus onClick={onClickPlus} />
        </div>
        <div className={styles.content}>
          {!isImgEmpty && (
            <div className={styles.sliderContainer}>
              <Slider {...settings} className={styles.slider}>
                {diaryImgs.map((img: string, index: number) => (
                  <img
                    key={index}
                    className={styles.sliderImg}
                    src={img}
                    alt="사진"
                  />
                ))}
              </Slider>
              <div className={styles.index}>
                {currentSlide + 1} / {sliderLength}
              </div>
            </div>
          )}
          <div className={styles.realContent}>{data.content}</div>
          <div className={styles.tags}>
            {tags.map((tag, index) => {
              return <TagChip key={index}>{tag}</TagChip>;
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
          onClickCancel={handleClose}
          onClickConfirm={handleConfirm}
          isOpen={isModalOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Detail;
