import styles from './TagChip.module.scss';

interface IProps {
  children: string;
  type?: string;
}

const TagChip = ({ children, type = 'default' }: IProps) => {
  return (
    <div
      className={`${styles.default} ${
        type === 'selected' ? styles.selected : ''
      } ${type === 'line' ? styles.line : ''}`}
    >
      {children}
    </div>
  );
};

export default TagChip;
