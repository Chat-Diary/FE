import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './InputName.module.scss';

interface IProps {
  value?: string;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  onSave?: (inputValue: string) => void;
}

const InputName = ({ value, setCount, onSave }: IProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputCount, setInputCount] = useState<number>(0);

  const [isLimited, setIsLimited] = useState<boolean>(true);

  const maxTyping = 12;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // input 값이 변경될 때 호출
    setInputValue(e.target.value);
    setInputCount(e.target.value.length);
    if (setCount !== undefined) setCount(e.target.value.length);

    const savedValue = inputValue;
    if (onSave !== undefined) onSave(savedValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setInputCount(value?.length);
    }
  }, []);

  return (
    <form>
      <div className={styles.textareaContainer}>
        <textarea
          onChange={handleInputChange}
          placeholder={'너의 이름은?'}
          maxLength={maxTyping}
          className={styles.default}
        >
          {value}
        </textarea>
        <div className={styles.counter}>
          <span>{inputCount}</span>
          <span>/{maxTyping}</span>
        </div>
      </div>
    </form>
  );
};

export default InputName;
