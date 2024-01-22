import styles from './TagChip.module.scss';

interface IProps {
  children: string;
  type?: string;
  onClick?: () => void;
}

const TagChip = ({ children, type = 'default', onClick }: IProps) => {
  return (
    <div
      className={`${styles.default} ${
        type === 'selected' ? styles.selected : ''
      } ${type === 'line' ? styles.line : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TagChip;
