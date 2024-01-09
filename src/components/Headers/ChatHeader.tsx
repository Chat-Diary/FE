import { useNavigate } from 'react-router-dom';
import styles from './ChatHeader.module.scss';
import { LeftChevron, CalendarIcon } from '../../assets/index';
import { getAi } from '../../utils/globalProfiles';

const ChatHeader = () => {
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate('/');
  };
  const character = getAi();
  return (
    <div className={styles.container}>
      <LeftChevron onClick={onGoBack} />
      <h3 className={styles.title}>
        {character === null ? '다다' : character.name}
      </h3>
      <CalendarIcon />
    </div>
  );
};

export default ChatHeader;
