import { Link } from 'react-router-dom';
import { Diary } from '../../../utils/diary';
import styles from './DiaryItem.module.scss';

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const tagMaxLengthToShow = 23;
  let currentLength = 0;
  const result: string[] = [];

  for (const tag of diary.tagList) {
    const tagText = '#' + tag.tagName;

    // 현재 길이에 태그를 추가해도 최대 길이를 초과하지 않을 경우에만 추가
    if (currentLength + tagText.length <= tagMaxLengthToShow) {
      result.push(tagText);
      currentLength += tagText.length + 1; // 추가된 태그와 공백 길이를 더함
    } else {
      break; // 최대 길이를 초과하면 반복 중단
    }
  }

  return (
    <Link
      to={`/detail?diary_date=${diary.diaryDate}`}
      className={styles.DiaryItem}
    >
      <img className={styles.DiaryImg} src={diary.photoUrls[0]} />
      <div>
        <div className={styles.DiaryTitleContainer}>
          <div className={styles.DiaryTitle}>{diary.title}</div>
        </div>
        <div className={styles.DiaryDate}>{diary.diaryDate}</div>
        <div className={styles.DiaryTags}>
          {result.map((tagText) => {
            return <div key={1}>{tagText}</div>;
          })}
        </div>
      </div>
    </Link>
  );
};

export default DiaryItem;
