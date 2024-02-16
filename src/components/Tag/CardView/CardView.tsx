import CardViewItem from './CardViewItem';
import styles from './CardView.module.scss';
import { Diary } from '../../../utils/diary';

interface IProps {
  dataList?: Diary[];
  isLoading?: boolean;
}

const CardView = ({ dataList, isLoading }: IProps) => {
  if (!dataList) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className={styles.LoadingWrapper}>
        {[...Array(2)].map((_, index) => (
          <div key={index} className={styles.LoadingDiaryItem} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.CardViewWrapper}>
      {dataList?.map((diary) => {
        return <CardViewItem key={diary.id} diary={diary} />;
      })}
    </div>
  );
};

export default CardView;
