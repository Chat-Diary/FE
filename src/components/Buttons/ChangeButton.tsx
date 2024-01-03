import styles from './ChangeButton.module.scss';

interface Props {
  children: string;
  disabled: boolean;
}

const ChangeButton = ({ children, disabled }: Props) => {
  return (
    <button className={`${styles.changeBtn} ${disabled ? '' : styles.abled}`}>
      {children}
    </button>
  );
};

export default ChangeButton;
