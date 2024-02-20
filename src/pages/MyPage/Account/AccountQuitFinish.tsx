import React from 'react';
import styles from './AccountQuitFinish.module.scss';
import ConfirmButton from '../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { getAi } from '../../../utils/globalProfiles';
import { ChichiCrying, DadaCrying, LuluCrying } from '../../../assets';
import { isLogin } from '../../../utils/user';

const AccountQuitFinish = () => {
  isLogin();
  const navigate = useNavigate();
  const ai = getAi();

  const aiImgs = [
    <DadaCrying key={1} />,
    <ChichiCrying key={2} />,
    <LuluCrying key={3} />,
  ];

  return (
    <>
      <div className={styles.header}>챗다이어리 탈퇴 완료</div>
      <div className={styles.sub}>다음에 다시 만나요!</div>
      <div className={styles.img}>{aiImgs[ai!.id]}</div>
      <ConfirmButton isAble={true} id={0} onClick={() => navigate('/login')}>
        홈으로 가기
      </ConfirmButton>
    </>
  );
};

export default AccountQuitFinish;
