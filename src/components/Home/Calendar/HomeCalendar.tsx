import { useNavigate } from 'react-router-dom';
import styles from './HomeCalendar.module.scss';

interface IProps {
  weekCalendarList: { day: number; characters: string[] }[][];
  currentDate: Date;
}

const HomeCalendar = ({ weekCalendarList, currentDate }: IProps) => {
  const navigate = useNavigate();

  const handleDateClick = (dayInfo: { day: number; characters: string[] }) => {
    const dateString = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }-${dayInfo.day < 10 ? '0' + dayInfo.day : dayInfo.day}`;
    if (dayInfo.characters.length > 0) {
      navigate(`/detail?diary_date=${dateString}`);
    }
  };

  const today = new Date();

  return (
    <div>
      <table className={styles.calendarWrapper}>
        <thead>
          <tr className={styles.dayOfWeekList}>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <th className={styles.dayOfWeek} key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.daysContainer}>
          {weekCalendarList.map((week, weekIndex) => (
            <tr className={styles.weekRow} key={weekIndex}>
              {week.map((dayInfo, dayIndex) => (
                <td
                  className={`${styles.dayBtn} ${
                    dayInfo.day === today.getDate() ? styles.active : ''
                  }`}
                  key={dayIndex}
                  onClick={() => handleDateClick(dayInfo)}
                >
                  {dayInfo.day !== 0 && (
                    <>
                      <span className={styles.dayString}>{dayInfo.day}</span>
                      <span className={styles.characterDots}>
                        {dayInfo.characters.map((character) => (
                          <div
                            key={character}
                            className={
                              character === 'DADA'
                                ? styles.dada
                                : character === 'LULU'
                                  ? styles.lulu
                                  : character === 'CHICHI'
                                    ? styles.chichi
                                    : ''
                            }
                          ></div>
                        ))}
                      </span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeCalendar;
