import styles from './BottomModal.module.scss';
import { useEffect } from 'react';

interface DateSelectorProps {
  children: React.ReactNode;
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const BottomModal = ({children, clickOuter, isOpen}: DateSelectorProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClickOuter = () => {
    clickOuter(false);
  }

  return (
    <>
      <div className={styles.Outer} onClick={handleClickOuter}></div>
      <div className={styles.BottomContainer}>{children}</div>
    </>
  );
};

export default BottomModal;
