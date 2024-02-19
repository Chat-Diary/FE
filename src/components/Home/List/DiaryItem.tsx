import { Link } from 'react-router-dom';
import { Diary } from '../../../utils/diary';
import styles from './DiaryItem.module.scss';
import React from 'react';

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const defaltImgUrl =
    'https://chatdiary-bucket.s3.ap-northeast-2.amazonaws.com/img_list_null.jpg';

  const modifiedTagList = diary.tagList.map((tag) => `#${tag.tagName}`);
  const sliceList = modifiedTagList.slice(0, 5);

  return (
    <Link
      to={`/detail?diary_date=${diary.diaryDate}`}
      className={styles.DiaryItem}
    >
      {diary.photoUrls.length > 0 ? (
        <div className={styles.imgWrapper}>
          <img className={styles.DiaryImg} src={diary.photoUrls[0]} />
        </div>
      ) : (
        <div className={styles.imgWrapper}>
          <img className={styles.DiaryImg} src={defaltImgUrl} />
        </div>
      )}
      <div>
        <div className={styles.DiaryTitleContainer}>
          <div className={styles.DiaryTitle}>{diary.title}</div>
        </div>
        <div className={styles.DiaryDate}>{diary.diaryDate}</div>
        <div className={styles.TagsWrapper}>
          <div className={styles.DiaryTags}>
            {sliceList.map((tagText) => {
              return (
                <div key={1} className={styles.DiaryTagItems}>
                  {tagText}
                </div>
              );
            })}
          </div>
          <div className={styles.Ellipsis}>{'...'}</div>
        </div>
      </div>
    </Link>
  );
};

export default DiaryItem;
