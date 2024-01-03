import styles from './ChangeButton.module.scss';

interface Props {
  children: string;
}

const ChangeButton = ({ children }: Props) => {
  return <div className={styles.changeBtn}>{children}</div>;
};

export default ChangeButton;
