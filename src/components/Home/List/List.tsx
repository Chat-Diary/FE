import { Diary } from '../../../utils/diary';
import DiaryItem from './DiaryItem';
import styles from './List.module.scss';

interface IProps {
  dataList?: Diary[];
  isLoading?: boolean;
}

const List = ({ dataList, isLoading }: IProps) => {
  console.log(dataList);

  if (!dataList) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.DiaryItem}>
            <div className={styles.DiaryImg} />
            <div>
              <div className={styles.DiaryTitle} />
              <div className={styles.DiaryDate} />
              <div className={styles.DiaryTags} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {dataList?.map((diaryItem: Diary) => {
        return <DiaryItem key={diaryItem.id} diary={diaryItem} />;
      })}
    </div>
  );
};

export default List;
