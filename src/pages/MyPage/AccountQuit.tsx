import React, { useEffect, useState } from 'react';
import styles from './AccountQuit.module.scss';

import ChangeHeader from '../../components/common/Header/ChangeAiHeader/ChangeHeader';
import ConfirmButton from '../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import QuitRadio from '../../components/common/Buttons/QuitRadio/QuitRadio';

const AccountQuit = () => {
  const navigate = useNavigate();
  const [checkedId, setCheckedId] = useState<number>(5);

  const quitReason = [
    '자주 사용하지 않아요',
    '보안이 불안해요',
    'AI의 말이 마음에 들지 않아요.',
    '오류가 많아서 불편해요.',
    '직접 쓰기',
  ];

  const radioChange = (id: number) => {
    setCheckedId(id);
    console.log(id);
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
        </div>
      </div>
      <ConfirmButton isAble={true} id={0} onClick={() => navigate('/')}>
        다음
      </ConfirmButton>
    </>
  );
};

export default AccountQuit;
