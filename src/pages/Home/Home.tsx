import { useState } from 'react';
import styles from './Home.module.scss';
import HomeCalendar from './HomeCalendar';
import List from './List';

const Home = () => {
  const [isList, setIsList] = useState(false);
  const toggleMode = () => {
    setIsList((prev) => !prev);
  };
  return (
    <div className={styles.example}>
      Home, hello
      <button onClick={toggleMode}>리스트 화면 전환</button>
      {isList ? <List /> : <HomeCalendar />}
    </div>
  );
};

export default Home;
