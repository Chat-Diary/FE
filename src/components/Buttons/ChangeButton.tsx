import styles from './ChangeButton.module.scss';

interface Props {
  children: string;
  isAble: boolean;
}

const ChangeButton = ({ children, isAble }: Props) => {
  return (
    <button className={`${styles.changeBtn} ${isAble ? styles.abled : ''}`}>
      {children}
    </button>
  );
};

export default ChangeButton;
