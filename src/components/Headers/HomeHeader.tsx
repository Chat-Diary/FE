import { ChatDiaryLogo } from '../../assets/index';
import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  return (
    <div className={styles.Logo}>
      <ChatDiaryLogo />
    </div>
  );
};

export default HomeHeader;
