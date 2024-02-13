import React, { ChangeEvent, useState } from 'react';
import styles from './InputName.module.scss';

interface IProps {
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  onSave?: (inputValue: string) => void;
}

const InputName = ({ setCount, onSave }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const maxTyping = 12;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input이 변경될 때마다 호출
    const value = e.target.value;

    if (value.length <= maxTyping) {
      setInputValue(value);

      if (onSave) onSave(value);
      if (setCount) setCount(value.length);
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
          <span>{inputValue.length}</span>
          <span>/{maxTyping}</span>
        </div>
      </div>
    </form>
  );
};

export default InputName;
