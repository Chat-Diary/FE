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
    const { data } = useQuery({
      queryKey: ['code', kakaoCode],
      queryFn: () => login(kakaoCode),
    });

    useEffect(() => {
      setUserInfo(data);
    }, [data]);
  } else {
    navigate('/');
    throw new Error('code is invalid');
  }

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userId', userInfo.userId?.toString());
      localStorage.setItem('nickname', userInfo.nickname);
      navigate('/home');
    }
  }, [userInfo]);

  return <div></div>;
};

export default KakaoLogin;
