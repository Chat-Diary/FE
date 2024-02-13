import { StreakDate } from '../../../../utils/diary';
import styles from './HomeProfileHeader.module.scss';

interface IProps {
  diaryStreakDate?: StreakDate;
}

const HomeProfileHeader = ({ diaryStreakDate }: IProps) => {
  return (
    <div className={styles.Line}>
      <img
        src={
          'https://chatdiary-bucket.s3.ap-northeast-2.amazonaws.com/profile_img/profile.png'
        }
        className={styles.UserProfile}
      />
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
