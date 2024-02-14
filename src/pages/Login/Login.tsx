import { useState } from 'react';
import { Dada200, Kakao } from '../../assets';
import styles from './Login.module.scss';
import DialogBtn from '../../components/common/Buttons/DialogBtn/DialogBtn';

const Login = () => {
  const [isKakao, setIsKakao] = useState(false);
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`
  
  const handleLogin = ()=>{
      window.location.href = kakaoURL
  }

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.helloBox}>
        <h2>안녕?</h2>
        <h2>
          {`난 '`}
          <span className={styles.dada}>다다</span>
          {`'라고 해!`}
        </h2>
      </div>
      <Dada200 />
      <div className={styles.psWrapper}>
        <p>귀찮은 일기 대신 나와 대화를 나누면</p>
        <p>더 쉽게 하루를 기록할 수 있을거야</p>
      </div>
      {isKakao ? (
        <button className={styles.kakaoBtn} onClick={handleLogin}>
          <Kakao />
          카카오 로그인
        </button>
      ) : (
        <div className={styles.startBtnWrapper}>
          <DialogBtn isActive={true} onClick={() => setIsKakao(true)}>
            시작하기
          </DialogBtn>
        </div>
      )}
    </div>
  );
};

export default Login;
