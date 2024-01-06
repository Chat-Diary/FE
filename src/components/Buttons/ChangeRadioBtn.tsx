import styles from './ChangeRadioBtn.module.scss';

interface Props {
  id: number;
  onChange: (id: number) => void;
}

const ChangeRadioBtn = ({ id, onChange }: Props) => {
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
