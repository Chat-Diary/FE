import { Link, useNavigate } from 'react-router-dom';
import { LeftChevron } from '../../../../assets';
import styles from './ChangeHeader.module.scss';
import { DiaryDetailType } from '../../../../apis/diaryDetailApi';

interface IProps {
  children: string;
  isMyPage?: boolean;
  state?: DiaryDetailType; // link 통해 넘길 state의 타입들 ||로 추가
  path?: string; // link 통해 넘길 path
}
const ChangeHeader = ({ children, isMyPage = false, state, path }: IProps) => {
  const navigator = useNavigate();

  return (
    <div className={styles.changeHeader}>
      {isMyPage ? (
        <></>
      ) : path ? (
        <Link
          to={`${path}`}
          state={{ detailData: state }}
          className={styles.leftChevron}
        >
          <LeftChevron />
        </Link>
      ) : (
        <LeftChevron
          className={styles.leftChevron}
          onClick={() => navigator(-1)}
        />
      )}
      <span>{children}</span>
    </div>
  );
};

export default ChangeHeader;
