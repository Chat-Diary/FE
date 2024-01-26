import React, { useState } from 'react';
import styles from './AccountQuit.module.scss';

import ChangeHeader from '../../components/common/Header/ChangeHeader/ChangeHeader';
import ConfirmButton from '../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import QuitRadio from '../../components/common/Buttons/QuitRadio/QuitRadio';
import AccountQuitDialog from '../../components/common/Dialog/AccountQuit/AccountQuitDialog';
import InputForm from '../../components/common/Input/InputForm';

const AccountQuit = () => {
  const navigate = useNavigate();
  const [isAble, setIsAble] = useState<boolean>(false);
  const [checkedId, setCheckedId] = useState<number>(5);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const quitReason = [
    '자주 사용하지 않아요',
    '보안이 불안해요',
    'AI의 말이 마음에 들지 않아요.',
    '오류가 많아서 불편해요.',
    '직접 쓰기',
  ];

  const radioChange = (id: number) => {
    setCheckedId(id);
    setIsAble(true);
    if (id == 4) {
      setIsTyping(true);
    }
  };

  const handleClickNext = () => {
    setIsModalOpen(true);
  };

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ChangeHeader>탈퇴하기</ChangeHeader>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>챗 다이어리를 탈퇴하시나요?</div>
          <div>탈퇴하시는 이유를 알려주세요.</div>
        </div>
        <div className={styles.radios}>
          {quitReason.map((r, key) => {
            return (
              <label
                key={key}
                className={checkedId === key ? styles.checked : ''}
              >
                <QuitRadio id={key} text={r} onClick={radioChange} />
              </label>
            );
          })}
          {isTyping ? (
            <InputForm
              length={140}
              placeHolder={'내용을 입력해주세요'}
            ></InputForm>
          ) : (
            ''
          )}
        </div>
      </div>
      <ConfirmButton isAble={isAble} id={0} onClick={handleClickNext}>
        다음
      </ConfirmButton>
      {isModalOpen ? (
        <AccountQuitDialog
          onClickCancel={onClickClose}
          onClickConfirm={() => navigate('/mypage/quit/finish')}
          isOpen={isModalOpen}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default AccountQuit;
