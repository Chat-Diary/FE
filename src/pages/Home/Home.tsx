import { useState } from 'react';
import styles from './Home.module.scss';
import HomeCalendar from './HomeCalendar';
import List from './List';
import { ListIcon, CalendarIcon } from '../../assets';

const Home = () => {
  const [isList, setIsList] = useState(false);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };
  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.dateNav}>
        {isList ? (
          <CalendarIcon onClick={toggleMode} />
        ) : (
          <ListIcon onClick={toggleMode} />
        )}
      </div>
      {isList ? <List /> : <HomeCalendar />}
    </div>
  );
};

export default Home;
