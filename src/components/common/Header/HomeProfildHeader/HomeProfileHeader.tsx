import { UserProfile } from '../../../../assets/index';
import { StreakDate } from '../../../../utils/diary';
import styles from './HomeProfileHeader.module.scss';

interface IProps {
  diaryStreakDate?: StreakDate;
}

const HomeProfileHeader = ({ diaryStreakDate }: IProps) => {
  return (
    <div className={styles.Line}>
      <UserProfile className={styles.UserProfile} />
      <div className={styles.UserInfo}>
        <span className={styles.Nickname}>예랑쟤랑</span>
        <div className={styles.StartDate}>
          꾸준히 일기 쓴 지 {diaryStreakDate?.diaryStreakDate}일 째에요
        </div>
      </div>
    </div>
  );
};

export default HomeProfileHeader;
