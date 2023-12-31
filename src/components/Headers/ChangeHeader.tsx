import { useNavigate } from 'react-router-dom';
import { LeftChevron } from '../../assets';
import styles from './ChangeHeader.module.scss';

interface Props {
  children: string;
}
const ChangeHeader = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.changeHeader}>
      <LeftChevron onClick={() => navigate('/chat')} />
      <span>{children}</span>
    </div>
  );
};

export default ChangeHeader;
