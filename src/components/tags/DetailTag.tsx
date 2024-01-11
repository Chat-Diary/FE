import styles from './DetailTag.module.scss';

interface IProps {
  children: string;
}

const DetailTag = ({ children }: IProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default DetailTag;
