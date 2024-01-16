import { DetailSlider } from '../../assets/index';
import styles from './CardViewItem.module.scss';

const CardViewItem = () => {
    return (
      <div className={styles.CardViewItem}>
        <DetailSlider key={0} />
      </div>
    );
  };
  
  export default CardViewItem;