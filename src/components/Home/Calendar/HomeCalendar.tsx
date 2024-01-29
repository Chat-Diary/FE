import styles from './HomeCalendar.module.scss';

interface IProps {
  weekCalendarList: { day: number; characters: string[] }[][];
  currentDate: Date;
}

const HomeCalendar = ({ weekCalendarList, currentDate }: IProps) => {
  const handleDateClick = (day: number) => {
    console.log(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${day}에 클릭했습니다.`,
    );
  };

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
                  className={styles.dayBtn}
                  key={dayIndex}
                  onClick={() => handleDateClick(dayInfo.day)}
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
