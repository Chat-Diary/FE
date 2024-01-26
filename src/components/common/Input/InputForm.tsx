import React, { ChangeEvent, useState } from 'react';
import styles from './InputForm.module.scss';

interface IProps {
  length: number;
  placeHolder: string;
}

const InputForm = ({ length, placeHolder }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // input 값이 변경될 때 호출
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // 폼 제출 시 호출
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          //   type="textarea"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeHolder}
          className={`
          ${styles.default}
          ${length === 44 ? styles.input44 : ''}
          ${length === 140 ? styles.input140 : ''}
          ${length === 240 ? styles.input240 : ''}`}
        />
      </form>
    </div>
  );
};

export default InputForm;
