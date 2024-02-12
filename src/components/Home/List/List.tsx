import { Diary } from '../../../utils/diary';
import DiaryItem from './DiaryItem';

interface IProps {
  dataList?: Diary[];
}

const List = ({ dataList }: IProps) => {
  if (!dataList) {
    return <></>;
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
