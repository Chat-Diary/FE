import styles from './MypageItem.module.scss';

interface IProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content: string;
  onClick: () => void;
}

const MypageItem = ({ icon: Icon, content, onClick }: IProps) => {
  return (
    <div className={styles.listItemContainer} onClick={onClick}>
      <Icon />
      <span>{content}</span>
    </div>
  );
};

export default MypageItem;
