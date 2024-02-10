import { Diary } from '../../../utils/diary';
import styles from './CardViewItem.module.scss';

interface IProps {
  diary: Diary;
}

const CardViewItem = ({ diary }: IProps) => {
  const maxLengthToShow = 28;
  let currentLength = 0;
  let tagLine: string[] = [];
  const tagLineList: string[][] = [];

  for (const tag of diary.tagList) {
    const tagText = '#' + tag.tagName;

    // 현재 길이에 태그를 추가해도 최대 길이를 초과하지 않을 경우에만 추가
    if (currentLength + tagText.length <= maxLengthToShow) {
      tagLine.push(tagText);
      currentLength += tagText.length + 1; // 추가된 태그와 공백 길이를 더함
    } else {
      tagLineList.push(tagLine);
      currentLength = 0;
      tagLine = [];
    }
  }

  if (tagLine.length != 0) {
    tagLineList.push(tagLine);
  }

  return (
    <div className={styles.CardViewItem}>
      {/* <CardExImage className={styles.CardViewItemImg} key={0} /> */}
      <img className={styles.CardViewItemImg} src={diary.photoUrls[0]} />
      <div className={styles.CardViewItemContent}>
        <div className={styles.DiaryTitle}>{diary.title}</div>
        <div className={styles.DiaryDate}>{diary.diaryDate}</div>
        <div className={styles.DiaryTagsContainer}>
          {tagLineList.map((tagLine, index) => (
            <div className={styles.DiaryTags} key={index}>
              {tagLine.map((tagText, subIndex) =>
                tagText === ' ' ? null : <div key={subIndex}>{tagText}</div>,
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardViewItem;
