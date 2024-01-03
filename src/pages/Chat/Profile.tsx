import {
  Dada,
  Chichi,
  Lulu,
  ChatDada,
  ChatChichi,
  ChatLulu,
} from '../../assets/index';
import ChangeButton from '../../components/Buttons/ChangeButton';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <>
      <ChangeHeader />
      <div className={styles.profileBefore}>
        <Dada />
        <span className={styles.name}>다다</span>
        <div className={styles.text}>
          안녕 나는 다다!
          <br />
          오늘 하루는 어땠어? 네 이야기를 들려줘!
        </div>
        <div className={styles.tags}>
          <span>#공감만렙</span>
          <span> #수다스러운</span>
        </div>
      </div>
      <div className={styles.profileAfter}>
        <div className={styles.chatProfile}>
          <div>
            <ChatChichi />
            <span className={styles.name}>치치</span>
          </div>
          <div className={styles.tags}>
            <span>#활발</span>
            <span>#호기심 가득</span>
          </div>
        </div>
        <div className={styles.chatProfile}>
          <div>
            <ChatLulu />
            <span className={styles.name}>루루</span>
          </div>
          <div className={styles.tags}>
            <span>#차분한</span>
            <span>#어른스러운</span>
          </div>
        </div>
      </div>
      <ChangeButton>변경하기</ChangeButton>
    </>
  );
};

export default Profile;
