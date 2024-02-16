import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../apis/loginApi';
import { useQuery } from 'react-query';

const KakaoLogin = () => {
  const navigate = useNavigate();

  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  const handleKakaoLogin = async () => {
    if (kakaoCode) {
      const { isLoading, error, data } = useQuery({
        queryKey: ['diary', kakaoCode],
        queryFn: () => login(kakaoCode),
      });
      localStorage.setItem("userId", data);
      console.log(data);
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
