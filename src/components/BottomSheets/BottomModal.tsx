import styles from './BottomModal.module.scss';

interface DateSelectorProps {
  children: React.ReactNode;
  clickOuter: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomModal = (props: DateSelectorProps) => {
  const handleClickOuter = () => {
    props.clickOuter(false);
  }

  return (
    <>
      <div className={styles.Outer} onClick={handleClickOuter}></div>
      <div className={styles.BottomContainer}>{props.children}</div>
    </>
  );
};

export default BottomModal;
