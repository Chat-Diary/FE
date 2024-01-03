import styles from './ChangeRadioBtn.module.scss';

interface Props {
  id: number;
}

const ChangeRadioBtn = ({ id }: Props) => {
  return (
    <input
      type="radio"
      name="group"
      id={`${id}`}
      className={styles.changeRadio}
    ></input>
  );
};

export default ChangeRadioBtn;
