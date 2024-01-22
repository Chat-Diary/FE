import styles from './ChangeRadioBtn.module.scss';

interface IProps {
  id: number;
  onChange: (id: number) => void;
}

const ChangeRadioBtn = ({ id, onChange }: IProps) => {
  return (
    <input
      type="radio"
      name="group"
      id={`${id}`}
      className={styles.changeRadio}
      onChange={() => onChange(id)}
    ></input>
  );
};

export default ChangeRadioBtn;
