import styles from './SortChangeRadioBtn.module.scss';

interface IProps {
  id: number;
  checkedId: number;
  onChange: (id: number) => void;
}

const SortChangeRadioBtn = ({ id, checkedId, onChange }: IProps) => {
  return (
    <input
      type="radio"
      name="group"
      id={`${id}`}
      className={styles.changeRadio}
      checked={checkedId === id}
      onChange={() => onChange(id)}
    ></input>
  );
};

export default SortChangeRadioBtn;