/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import styles from './DetailHeader.module.scss';

import { LeftChevron, DetailEdit } from '../../../../assets/index';

interface DiaryDetailType {
  diaryDate: string;
  title: string;
  imgUrl: string[];
  content: string;
  tagName: string[];
  characterIndex: number;
}

interface IProps {
  children: string;
  date: Date;
  info: DiaryDetailType;
}
const DetailHeader = ({ children, date, info }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      <LeftChevron onClick={() => navigate(-1)} />
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
