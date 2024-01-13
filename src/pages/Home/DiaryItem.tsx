import React from 'react';
import styles from './DiaryItem.module.scss';

const tags = [{"id":1, "tag":"#업무"}, {"id":2, "tag":"#식당"}, {"id":3, "tag":"#식사"}]

const DiaryItem = () => {
    return <div className={styles.DiaryItem}>
        <div className={styles.DiaryImg}></div>
        <div>
            <div className={styles.DiaryTitleContainer}>
                <div className={styles.DiaryTitle}>쿠잇X스택 첫 오프라인 회의 가나다라마바사</div>
                <div className={styles.DiaryTitleMore}>...</div>
            </div>
            <div className={styles.DiaryDate}>2023.11.14</div>
            <div className={styles.DiaryTags}>
                {tags.map((tag)=>(
                    <div className={styles.DiaryTag} key={tag.id}>
                        {tag.tag}
                    </div>
                ))}
            </div>
        </div>
    </div>
  };
  
  export default DiaryItem;