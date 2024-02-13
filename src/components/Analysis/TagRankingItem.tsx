import { TagCounts } from '../../utils/analysisDetail';
import TagChip from '../Tag/AllTags/TagChip';
import styles from './TagRankingItem.module.scss';

interface IProps {
  rank?: number;
  tagData: TagCounts;
}

const TagRankingItem = ({ rank, tagData }: IProps) => {
  if (!rank) {
    return <></>;
  }

  return (
    <div className={styles.Container}>
      <div className={`${rank <= 3 ? styles.TopThree : styles.NonTopThree}`}>
        {rank}
      </div>
      <div className={styles.Tags}>
        {tagData.tags.map((tag, index) => {
          return (
            <TagChip key={index} type={`${rank <= 3 ? 'line' : 'default'}`}>
              {tag}
            </TagChip>
          );
        })}
      </div>
      <div className={styles.Count}>
        {tagData.count}
        <span>회</span>
      </div>
    </div>
  );
};

export default TagRankingItem;
