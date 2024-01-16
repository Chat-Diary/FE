import React from 'react';
import styles from './DetailEditing.module.scss';
import ChangeHeader from '../../components/Headers/ChangeHeader';
import InputForm from '../../components/Input/InputForm';

const DetailEditing = () => {
  return (
    <>
      <ChangeHeader>일기 수정하기</ChangeHeader>
      <div className={styles.wholeWrapper}>
        <div className={styles.header}>
          <div>2023 11월 12일</div>
          <InputForm
            length={44}
            placeHolder={'이름을 입력해주세요'}
          ></InputForm>
        </div>
      </div>
    </>
  );
};

export default DetailEditing;
