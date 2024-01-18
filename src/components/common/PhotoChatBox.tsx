import styles from './PhotoChatBox.module.scss';
import { formatHourAndMinute } from '../../utils/dateFormatters';
interface IProps {
  url: string;
  date: string;
}

const PhotoChatBox = ({ url, date }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>{formatHourAndMinute(date)}</span>
      <div className={styles.photo}>
        <img src={url} alt="User Image" />
      </div>
    </div>
  );
};

export default PhotoChatBox;
