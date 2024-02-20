import { useNavigate } from 'react-router-dom';

export interface IUserInfo {
  jwt: string;
  userId: number;
  nickname: string;
}

export const getUserId = () => {
  if (localStorage.getItem('userId')) {
    return Number(localStorage.getItem('userId'));
  } else {
    throw new Error('localStorage에 userId가 없습니다.');
  }
};
export const isLogin = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem('userId')) {
    navigate('/login');
  }
};
