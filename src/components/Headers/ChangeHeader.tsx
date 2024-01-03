import { LeftChevron } from '../../assets';
import styles from './ChangeHeader.module.scss';

const ChangeHeader = () => {
  return (
    <div className={styles.changeHeader}>
      <LeftChevron />
      <span>대화 상대 변경</span>
    </div>
  );
};

export default ChangeHeader;
