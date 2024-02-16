import { useQuery } from 'react-query';
import NoticeItem from '../../../components/MyPage/Notice/NoticeItem';
import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import styles from './Notice.module.scss';
import { NoticeType, getNotice } from '../../../apis/mypageApi';
import { useEffect, useState } from 'react';

const Notice = () => {
  const [contents, setContents] = useState<NoticeType[]>();

  const parseDate = (d: string) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const parsedDate = year + '.' + month + '.' + day;

    return parsedDate;
  };

  const { data, error } = useQuery<NoticeType[]>({
    queryKey: ['NOTICE', 'LIST'],
    queryFn: () => getNotice(),
  });

  useEffect(() => {
    setContents(data);
  }, [data]);

  if (error) console.error(error);

  return (
    <div className={styles.noticeContainer}>
      <ChangeHeader>공지사항</ChangeHeader>
      <div className={styles.listContainer}>
        {contents
          ? contents.map((content, index) => {
              return (
                <NoticeItem
                  content={content.title}
                  date={parseDate(content.noticeDate)}
                  key={content.id}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Notice;
