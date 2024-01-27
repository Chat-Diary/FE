import { useNavigate } from 'react-router-dom';
import { RightChevron } from '../../../assets';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import styles from './Account.module.scss';
import { useState } from 'react';
import LogoutDialog from '../../../components/common/Dialog/LogoutDialog/LogoutDialog';

const Account = () => {
  const navigate = useNavigate();

  const onClickAccountDetail = (url: string) => {
    navigate(url);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  const onClickLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.accountContainer}>
      <ChangeHeader>계정</ChangeHeader>

      <div className={styles.listContainer}>
        <div className={styles.listItemContainer}>
          <span>이메일 변경</span>
          <RightChevron />
        </div>
        <div className={styles.listItemContainer}>
          <span>비밀번호 변경</span>
          <RightChevron />
        </div>
        <div className={styles.listItemContainer} onClick={onClickLogout}>
          <span>로그아웃</span>
          <RightChevron />
        </div>
        <div
          className={styles.listItemContainer}
          onClick={() => onClickAccountDetail('/mypage/account/quit')}
        >
          <span>탈퇴하기</span>
          <RightChevron />
        </div>
      </div>

      {isModalOpen ? (
        <LogoutDialog
          onClickCancel={onClickClose}
          onClickConfirm={() => {
            onClickClose;
            navigate('/');
          }}
          isOpen={isModalOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Account;
