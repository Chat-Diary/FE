import BottomNav from '../../components/common/BottomNav/BottomNav';
import ChangeHeader from '../../components/common/Header/ChangeHeader/ChangeHeader';
import {
  UserProfile,
  Update,
  Account,
  Alert,
  Info,
  mypageNotice,
  Theme,
  Refresh,
} from '../../assets/index';
import styles from './MyPage.module.scss';
import { useNavigate } from 'react-router-dom';
import MyPageItem from '../../components/MyPage/MyPageItem';

const MyPage = () => {
  const navigate = useNavigate();

  const icons = [Account, Alert, Theme, Refresh, mypageNotice, Info];
  const content = [
    '계정',
    '알림',
    '테마 설정',
    '정보 초기화',
    '공지사항',
    '정보',
  ];
  const navigateUrl = ['/mypage/account', '', '', '', '/mypage/notice'];

  const onClickMypageDetail = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <ChangeHeader isMypage={true}>마이페이지</ChangeHeader>
      <div className={styles.profileContainer}>
        <UserProfile className={styles.profileImg} />
        <div className={styles.profileName}>
          <span>예랑쟤랑</span>
          <Update />
        </div>
      </div>
      <div className={styles.listContainer}>
        {icons.map((icon, index) => {
          return (
            <MyPageItem
              icon={icon}
              content={content[index]}
              onClick={() => onClickMypageDetail(navigateUrl[index])}
              key={index}
            />
          );
        })}
      </div>
      <BottomNav page={3} />
    </div>
  );
};

export default MyPage;
