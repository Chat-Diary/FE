import styles from './MypageItem.module.scss';

interface IProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content: string;
}

const MypageItem = ({ icon: Icon, content }: IProps) => {
  return (
    <div className={styles.listItemContainer}>
      <Icon />
      <span>{content}</span>
    </div>
  );
};

export default MypageItem;
