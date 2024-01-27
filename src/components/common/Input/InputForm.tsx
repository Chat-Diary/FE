import React, { ChangeEvent, useState } from 'react';
import styles from './InputForm.module.scss';

interface IProps {
  length: number;
  placeHolder: string;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}

const InputForm = ({ length, placeHolder, setCount }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputCount, setInputCount] = useState<number>(0);
  let maxTyping = 0;

  if (length === 140) {
    maxTyping = 120;
  } else if (length === 240) {
    maxTyping = 200;
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // input 값이 변경될 때 호출
    setInputValue(e.target.value);
    setInputCount(e.target.value.length);
    if (setCount !== undefined) setCount(e.target.value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // 폼 제출 시 호출
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.textareaContainer}>
          <textarea
            //   type="textarea"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeHolder}
            maxLength={maxTyping}
            className={`
          ${styles.default}
          ${length === 44 ? styles.input44 : ''}
          ${length === 140 ? styles.input140 : ''}
          ${length === 240 ? styles.input240 : ''}`}
          />
          <div className={styles.counter}>
            <span>{inputCount}</span>
            <span>/{maxTyping}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
