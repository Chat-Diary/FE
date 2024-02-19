import { Diary } from '../../../utils/diary';
import DiaryItem from './DiaryItem';
import styles from './List.module.scss';

interface IProps {
  dataList?: Diary[];
  isLoading?: boolean;
}

const List = ({ dataList, isLoading }: IProps) => {
  console.log(dataList);

  if (dataList?.length === 0) {
    return (
      <div className={styles.noDiaryContainer}>
        <div className={styles.noDiary}>
          해당되는 일기가 없어요!
          <br />
          다른 달로 변경해보세요
        </div>
      </div>
    );
  }

  if (isLoading) {
    console.log('리스트 로딩중');
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.LoadingDiaryItem}>
            <div className={styles.LoadingDiaryImg} />
            <div>
              <div className={styles.LoadingDiaryTitle} />
              <div className={styles.LoadingDiaryDate} />
              <div className={styles.LoadingDiaryTags} />
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
