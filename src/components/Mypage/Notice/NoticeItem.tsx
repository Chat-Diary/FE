import styles from './NoticeItem.module.scss';

interface IProps {
    content: string;
    date: string;
    // onClick: () => void;
  }

const NoticeItem = ({ content, date, /*onClick*/ }: IProps) => {
  return (
    <div className={styles.listItemContainer} /*onClick={onClick}*/>
      <span>{content}</span>
      <span>{date}</span>
    </div>
  );
};

export default NoticeItem;
