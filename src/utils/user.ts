export interface IUserInfo {
  jwt: string;
  userId: number;
  nickname: string;
}

export const getUserId = () => {
  if (localStorage.getItem('userId')) {
    return localStorage.getItem('userId');
  } else {
    throw new Error('localStorage에 userId가 없습니다.');
  }
};
