import { useNavigate } from 'react-router-dom';
import styles from './DetailHeader.module.scss';

import { LeftChevron, DetailEdit } from '../../../../assets/index';

interface IProps {
  children: string;
  onClick: () => void;
}
const DetailHeader = ({ children, onClick }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      <LeftChevron onClick={() => navigate(-1)} />
      <span>{children}</span>
      <DetailEdit onClick={onClick} />
    </div>
  );
};

export default DetailHeader;
