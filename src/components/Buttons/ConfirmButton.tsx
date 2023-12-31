import styles from './ConfirmButton.module.scss';

interface Props {
  children: string;
  isAble: boolean;
  id: number;
  onClick: (id: number) => void;
}

const ConfirmButton = ({ children, isAble, id, onClick }: Props) => {
  return (
    <button
      className={`${styles.changeBtn} ${isAble ? styles.abled : ''}`}
      onClick={() => onClick(id)}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;
