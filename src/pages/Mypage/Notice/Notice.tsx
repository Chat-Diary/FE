import NoticeItem from '../../../components/Mypage/Notice/NoticeItem';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import styles from './Notice.module.scss';

const Notice = () => {
  const contents = [
    'v3.1000 업데이트 안내',
    '다다 임시점검 공지',
    '특별 이벤트 (~12/25)',
    '친밀도 기능 업데이트 공지',
    '사진, 동영상 전송 기능 업데이트 공지',
    '부분 유료화 관련 공지',
    '집에 가고 싶다 이슈',
    '이용약관 변경 공지',
  ];

  return (
    <div className={styles.noticeContainer}>
      <ChangeHeader>공지사항</ChangeHeader>
      <div className={styles.listContainer}>
        {contents.map((content, index) => {
          return (
            <NoticeItem
              content={content}
              date={'2023.11.16'}
              //   onClick={}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notice;
