import { ChatDiaryLogo } from '../../../assets/index';
import styles from './Header.module.scss';

const HomeHeader = () => {
  return (
    <div className={styles.HomeHeader}>
      <ChatDiaryLogo className={styles.Logo} />
    </div>
  );
};

export default HomeHeader;
