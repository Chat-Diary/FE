import styles from './BottomNav.module.scss';

import {
  FloatingBtn,
  NavHome,
  NavTag,
  NavAn,
  NavMy,
  NavHomeActive,
  NavTagActive,
  NavAnActive,
  NavMyActive,
} from '../../../assets/index';
import { Link } from 'react-router-dom';

interface IProps {
  page: number;
  isBtn?: boolean;
}

const BottomNav = ({ page, isBtn = true }: IProps) => {
  return (
    <>
      {isBtn ? (
        <Link to="/chat">
          <div className={styles.floatingBtn}>{<FloatingBtn />}</div>
        </Link>
      ) : (
        ''
      )}
      <nav className={styles.bottomNav}>
        <Link to="/home" className={styles.navLink}>
          {page === 0 ? (
            <>
              <NavHomeActive />
              <div className={styles.labelActive}>홈</div>
            </>
          ) : (
            <>
              <NavHome />
              <div className={styles.label}>홈</div>
            </>
          )}
        </Link>
        <Link to="/tag" className={styles.navLink}>
          {page === 1 ? (
            <>
              <NavTagActive />
              <div className={styles.labelActive}>태그</div>
            </>
          ) : (
            <>
              <NavTag />
              <div className={styles.label}>태그</div>
            </>
          )}
        </Link>
        <Link to="/analysis" className={styles.navLink}>
          {page === 2 ? (
            <>
              <NavAnActive />
              <div className={styles.labelActive}>분석</div>
            </>
          ) : (
            <>
              <NavAn />
              <div className={styles.label}>분석</div>
            </>
          )}
        </Link>
        <Link to="/mypage" className={styles.navLink}>
          {page === 3 ? (
            <>
              <NavMyActive />
              <div className={styles.labelActive}>마이페이지</div>
            </>
          ) : (
            <>
              <NavMy />
              <div className={styles.label}>마이페이지</div>
            </>
          )}
        </Link>
      </nav>
    </>
  );
};

export default BottomNav;
