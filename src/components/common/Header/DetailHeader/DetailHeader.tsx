/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import styles from './DetailHeader.module.scss';

import { LeftChevron, DetailEdit } from '../../../../assets/index';
import { DiaryDetailType } from '../../../../apis/diaryDetailApi';
import usePageStore from '../../../../stores/pageStore';

interface IProps {
  children: string;
  date: string;
  info?: DiaryDetailType;
}
const DetailHeader = ({ children, date, info }: IProps) => {
  const navigate = useNavigate();
  const prevPath = usePageStore((state) => state.prevPath);
  const prevList = usePageStore((state) => state.prevList);

  return (
    <div className={styles.changeHeader}>
      <LeftChevron
        onClick={() => {
          navigate(prevPath);
          console.log(prevPath);
          console.log(prevList);
        }} /*이전 페이지 정보 받아와야 함*/
      />
      <span>{children}</span>
      <Link
        to={`/detail/modify?diary_date=${date}`}
        state={{ detailData: info }}
      >
        <DetailEdit />
      </Link>
    </div>
  );
};

export default DetailHeader;
