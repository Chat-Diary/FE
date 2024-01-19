import styles from './SortRadio.module.scss';
import ChangeRadioBtn from '../../components/Buttons/ChangeRadioBtn';

interface ISortRadio {
  id: number;
  name: string;
  onClick: (id: number) => void;
}

const SortRadio = ({ id, name, onClick }: ISortRadio) => {
  return (
    <div className={styles.radioContainer}>
      <div>
        <span className={styles.name}>{name}</span>
      </div>
      <div>
        <ChangeRadioBtn id={id} onChange={onClick} />
      </div>
    </div>
  );
};

export default SortRadio;
