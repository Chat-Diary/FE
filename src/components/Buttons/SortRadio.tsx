import styles from './SortRadio.module.scss';
import SortChangeRadioBtn from '../../components/Buttons/SortChangeRadioBtn';

interface ISortRadio {
  id: number;
  name: string;
  checkedId: number;
  onClick: (id: number) => void;
}

const SortRadio = ({ id, name, checkedId, onClick }: ISortRadio) => {
  return (
    <div className={styles.radioContainer}>
      <div>
        <span className={styles.name}>{name}</span>
      </div>
      <div>
        <SortChangeRadioBtn id={id} checkedId={checkedId} onChange={onClick} />
      </div>
    </div>
  );
};

export default SortRadio;
