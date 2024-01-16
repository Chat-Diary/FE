import { useNavigate } from 'react-router-dom';
import { LeftChevron } from '../../assets';
import styles from './ChangeHeader.module.scss';

interface IProps {
  children: string;
}
const ChangeHeader = ({ children }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      <LeftChevron onClick={() => navigate(-1)} />
      <span>{children}</span>
    </div>
  );
};

export default ChangeHeader;
