import { useNavigate } from 'react-router-dom';
import { LeftChevron } from '../../../../assets';
import styles from './ChangeHeader.module.scss';

interface IProps {
  children: string;
  isMyPage?: boolean;
}
const ChangeHeader = ({ children, isMyPage = false }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      {isMyPage ? (
        <></>
      ) : (
        <LeftChevron
          className={styles.leftChevron}
          onClick={() => navigate(-1)}
        />
      )}
      <span>{children}</span>
    </div>
  );
};

export default ChangeHeader;
