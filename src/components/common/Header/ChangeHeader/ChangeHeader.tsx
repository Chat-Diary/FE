import { useNavigate } from 'react-router-dom';
import { LeftChevron } from '../../../../assets';
import styles from './ChangeHeader.module.scss';

interface IProps {
  children: string;
  isMypage?: boolean;
}
const ChangeHeader = ({ children, isMypage = false }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      {isMypage ? (
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
