import { CardExImage } from '../../../assets/index';
import styles from './CardViewItem.module.scss';

const tags = [
  { id: 1, tag: '#피곤함' },
  { id: 2, tag: '#식사' },
  { id: 3, tag: '#업무' },
  { id: 4, tag: '#식당' },
  { id: 5, tag: '#잠' },
  { id: 6, tag: '#술' },
  { id: 7, tag: '#괜찮음' },
  { id: 8, tag: '#영화' },
  { id: 9, tag: '#선후배' },
  { id: 10, tag: '#피곤함' },
  { id: 11, tag: '#식사' },
  { id: 12, tag: '#업무' },
  { id: 13, tag: '#식당' },
  { id: 14, tag: '#잠' },
  { id: 15, tag: '#술' },
  { id: 16, tag: '#선후배' },
  { id: 17, tag: '#피곤함' },
  { id: 18, tag: '#식사' },
  { id: 19, tag: '#업무' }
];

const maxLengthToShow = 28;
let currentLength = 0;
let tagLine: string[] = [];
const tagLineList: string[][] = [];

for (const tag of tags) {
  const tagText = tag.tag;

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

const diaryTitle = '쿠잇X스택 첫 오프라인 회의 가나라마바사';

const CardViewItem = () => {
  return (
    <div className={styles.CardViewItem}>
      <CardExImage className={styles.CardViewItemImg} key={0} />
      <div className={styles.CardViewItemContent}>
        <div className={styles.DiaryTitle}>{diaryTitle}</div>
        <div className={styles.DiaryDate}>2023.11.14</div>
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
