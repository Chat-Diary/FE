import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../apis/loginApi';
import { useQuery } from 'react-query';
import { IUserInfo } from '../../../utils/user';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  if (kakaoCode) {
    const { isLoading, error, data } = useQuery({
      queryKey: ['diary', kakaoCode],
      queryFn: () => login(kakaoCode),
    });

    useEffect(() => {
      setUserInfo(data);
    }, [data]);

    if (userInfo) {
      localStorage.setItem('userId', userInfo.userId?.toString());
      localStorage.setItem('nickname', userInfo.nickname);
    }

    navigate('/');
  } else {
    navigate('/login');
    throw new Error('code is invalid');
  }

  return <div></div>;
};

export default KakaoLogin;
