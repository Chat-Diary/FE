/* eslint-disable react/jsx-key */
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './Detail.module.scss';
import DetailHeader from '../../components/Headers/DetailHeader';

import { Dada36, Chichi36, Lulu36, DetailPlus } from '../../assets/index';
import DetailTag from '../../components/tags/DetailTag';
import { useState } from 'react';

const img36 = [<Dada36 key={0} />, <Chichi36 key={1} />, <Lulu36 key={2} />];

const Detail = () => {
  // const navigate = useNavigate();
  const tags = ['기쁨', '식당', '초면', '학교', '카페', '선후배', '공부'];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onChangeEdit = () => {
    // navigate('/');
    console.log('편집 버튼 클릭');
  };

  return (
    <>
      <DetailHeader onClick={onChangeEdit}>땡월땡일</DetailHeader>
      <div className={styles.detailContainer}>
        <div className={styles.header}>
          <div>
            {img36[0]}
            <span>챗다이어리 첫 오프라인</span>
          </div>
          <DetailPlus />
        </div>
        <div className={styles.content}>
          <image />
          <span>
            처음으로 개발자랑 디자이너랑 만났어! 어색하지 않을까 걱정했는데
            다행히 말도 잘 통해서 그런일은 없었다ㅎㅎ 대략적인 작업 이야기를
            마치고 저녁메뉴를 이야기했는데 다들 눈이 더 반짝이더라고... 건대생
            덕분에 건대 맛집에서 맛있게 먹어서 기분 최고다! 다음에 건대 올 때 또
            와야지~
          </span>
          <div className={styles.tags}>
            {tags.map((tag) => {
              return <DetailTag>{tag}</DetailTag>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
