import styles from './TagChip.module.scss';

interface IProps {
  children: string;
  type?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const TagChip = ({ children, type = 'default', onClick, disabled }: IProps) => {
  return (
    <button
      className={`${styles.default} ${
        type === 'selected' ? styles.selected : ''
      } ${type === 'line' ? styles.line : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TagChip;
