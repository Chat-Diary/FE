import React, { useState } from 'react';
import styles from './JoinName.module.scss';
import { Dada80 } from '../../assets';
import ConfirmButton from '../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import InputName from '../../components/common/Input/InputName';

const LoginName = () => {
  const [typingValue, setTypingValue] = useState<string>('');
  const [typingCount, setTypingCount] = useState<number>(0);

  const handleStart = () => {
    console.log('시작하기: ', typingValue);
  };

  const handleSave = (s: string) => {
    setTypingValue(s);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.label}>
          대화할 때 부를 수 있는<br></br>너의 이름을 알려줘.
        </div>
        <Dada80 />
      </div>
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <InputName setCount={setTypingCount} onSave={handleSave} />
        </div>
        <div className={styles.buttonContainer}>
          <ConfirmButton
            isAble={typingCount === 0 ? false : true}
            id={0}
            onClick={handleStart}
          >
            시작하기
          </ConfirmButton>
        </div>
      </div>
    </>
  );
};

export default LoginName;
