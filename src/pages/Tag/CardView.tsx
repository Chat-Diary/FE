import CardViewItem from './CardViewItem';
import styles from './CardView.module.scss';

const diaries = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const CardView = () => {
  return (
    <div className={styles.CardViewWrapper}>
      {diaries.map((diary) => {
        return <CardViewItem key={diary.id} />;
      })}
    </div>
  );
};

export default CardView;
