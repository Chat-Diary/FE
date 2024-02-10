import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './InputName.module.scss';

interface IProps {
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  onSave?: (inputValue: string) => void;
}

const InputName = ({ setCount, onSave }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputCount, setInputCount] = useState<number>(0);

  const maxTyping = 12;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input이 변경될 때마다 호출
    const value = e.target.value;

    if (value.length <= maxTyping) {
      setInputValue(value);
      setInputCount(value.length);

      if (onSave !== undefined) onSave(value);
      if (setCount !== undefined) setCount(value.length);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder={'너의 이름은?'}
          maxLength={maxTyping}
          className={styles.default}
          value={inputValue}
        />
        <div className={styles.counter}>
          <span>{inputCount}</span>
          <span>/{maxTyping}</span>
        </div>
      </div>
    </form>
  );
};

export default InputName;
