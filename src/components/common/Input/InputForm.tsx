/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './InputForm.module.scss';

interface IProps {
  value?: string;
  length: number;
  placeHolder: string;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  onSave?: (inputValue: string) => void;
}

const InputForm = ({
  value,
  length,
  placeHolder,
  setCount,
  onSave,
}: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputCount, setInputCount] = useState<number>(0);

  const [isLimited, setIsLimited] = useState<boolean>(true);

  let maxTyping = 100;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // input 값이 변경될 때 호출
    setInputValue(e.target.value);
    setInputCount(e.target.value.length);

    if (setCount !== undefined) setCount(e.target.value.length);
    if (onSave !== undefined) onSave(e.target.value);
  };

  useEffect(() => {
    if (value !== undefined) {
      setInputCount(value?.length);
    }
  }, []);

  useEffect(() => {
    if (length === 140) {
      maxTyping = 120;
    } else if (length === 240) {
      maxTyping = 200;
    } else {
      setIsLimited(false);
    }
  });

  return (
    <div>
      <form>
        <div className={styles.textareaContainer}>
          <textarea
            onChange={handleInputChange}
            placeholder={placeHolder}
            maxLength={maxTyping}
            className={`
          ${styles.default}
          ${length === 44 ? styles.input44 : ''}
          ${length === 140 ? styles.input140 : ''}
          ${length === 240 ? styles.input240 : ''}`}
          >
            {value}
          </textarea>
          {isLimited ? (
            <div className={styles.counter}>
              <span>{inputCount}</span>
              <span>/{maxTyping}</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </div>
  );
};

export default InputForm;
