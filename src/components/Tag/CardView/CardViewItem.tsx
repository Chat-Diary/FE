import { Link } from 'react-router-dom';
import { Diary } from '../../../utils/diary';
import styles from './CardViewItem.module.scss';

interface IProps {
  diary: Diary;
}

const CardViewItem = ({ diary }: IProps) => {
  const modifiedTagList = diary.tagList.map((tag) => `#${tag.tagName}`);

  return (
    <>
      {diary.photoUrls[0] && /\.(jpg|jpeg|png)$/i.test(diary.photoUrls[0])  ? (
        <Link
          to={`/detail?diary_date=${diary.diaryDate}`}
          className={styles.CardViewItem}
        >
          <div className={styles.imgWrapper}>
            <img className={styles.CardViewItemImg} src={diary.photoUrls[0]} />
          </div>
          <div className={styles.CardViewItemContent}>
            <div className={styles.DiaryTitle}>{diary.title}</div>
            <div className={styles.DiaryDate}>{diary.diaryDate}</div>
            <div className={styles.DiaryTags}>
              {modifiedTagList.map((tagText) => {
                return (
                  <div key={1} className={styles.DiaryTagItems}>
                    {tagText}
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          to={`/detail?diary_date=${diary.diaryDate}`}
          className={styles.NoImgCardViewItem}
        >
          <div className={styles.NoImgCardViewItemContent}>
            <div className={styles.NoImgDiaryTitle}>{diary.title}</div>
            <div className={styles.NoImgDiaryDate}>{diary.diaryDate}</div>
            <div className={styles.NoImgDiaryTags}>
              {modifiedTagList.map((tagText) => {
                return (
                  <div key={1} className={styles.NoImgDiaryTagItems}>
                    {tagText}
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CardViewItem;
