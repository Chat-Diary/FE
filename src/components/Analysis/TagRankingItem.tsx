import TagChip from '../Tag/AllTags/TagChip';
import styles from './TagRankingItem.module.scss';

interface IProps {
  rank?: number;
}

const TagRankingItem = ({ rank }: IProps) => {
  if (!rank) {
    console.log(rank);
    return <></>;
  }

  const TagList = ['집', '학교', '과제'];

  return (
    <div className={styles.Container}>
      <div className={`${rank <= 3 ? styles.TopThree : styles.NonTopThree}`}>
        {rank}
      </div>
      <div className={styles.Tags}>
        {TagList.map((tag, index) => {
          return (
            <TagChip
              key={index}
              type={'line'}
              onClick={() => {
                console.log();
              }}
            >
              {tag}
            </TagChip>
          );
        })}
      </div>
      <div className={styles.Count}>
        12<span>회</span>
      </div>
    </div>
  );
};

export default TagRankingItem;