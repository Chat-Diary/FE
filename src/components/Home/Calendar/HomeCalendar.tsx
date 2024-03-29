import { useNavigate } from 'react-router-dom';
import styles from './HomeCalendar.module.scss';
import { isExactlyToday, isNotToday } from '../../../utils/dateFormatters';
import { ICalendar } from '../../../hooks/useCalendar';

interface IProps {
  weekCalendarList: ICalendar[][];
  currentDate: Date;
}

const HomeCalendar = ({ weekCalendarList, currentDate }: IProps) => {
  const navigate = useNavigate();

  const handleDateClick = (dayInfo: ICalendar) => {
    const dateString = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }-${dayInfo.day < 10 ? '0' + dayInfo.day : dayInfo.day}`;
    if (dayInfo.character && dayInfo.day !== today.getDate()) {
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
                    isExactlyToday(currentDate, today, dayInfo) && styles.active
                  }`}
                  key={dayIndex}
                  onClick={() => handleDateClick(dayInfo)}
                >
                  {dayInfo.day !== 0 && (
                    <>
                      <span className={styles.dayString}>{dayInfo.day}</span>
                      {isNotToday(currentDate, today, dayInfo) && (
                        <span className={styles.characterDots}>
                          <div
                            key={dayInfo.day}
                            className={
                              dayInfo.character ? styles[dayInfo.character] : ''
                            }
                          ></div>
                        </span>
                      )}
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
