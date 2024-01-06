import styles from './BottomModal.module.scss';

const BottomModal = (props: any) => {
    return (
        <>
            <div className={styles.Outer}></div>
            <div className={styles.BottomContainer}>
                {props.children}
            </div>
        </>
    )
};

export default BottomModal;