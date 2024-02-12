import CardViewItem from './CardViewItem';
import styles from './CardView.module.scss';
import { Diary } from '../../../utils/diary';

interface IProps {
  dataList?: Diary[];
}

const CardView = ({ dataList }: IProps) => {
  return (
    <div className={styles.CardViewWrapper}>
      {dataList?.map((diary) => {
        return <CardViewItem key={diary.id} diary={diary}/>;
      })}
    </div>
  );
};

export default CardView;
