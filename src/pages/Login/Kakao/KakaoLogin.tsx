import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();

  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  const handleKakaoLogin = async () => {
    if (kakaoCode) {
      navigate('/');
    } else {
      navigate('/login');
      throw new Error('code is invalid');
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return <div></div>;
};

export default KakaoLogin;
