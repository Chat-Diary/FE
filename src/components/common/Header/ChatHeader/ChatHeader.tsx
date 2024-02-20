import styles from './ChatHeader.module.scss';
import { LeftChevron, Calendar24 } from '../../../../assets/index';
import { getAi } from '../../../../utils/globalProfiles';
import { Link } from 'react-router-dom';

interface IProps {
  onClick: () => void;
}

const ChatHeader = ({ onClick }: IProps) => {
  const character = getAi();
  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/">
        <LeftChevron />
      </Link>
      <Link className={styles.link} to="/chat/profile">
        <h3 className={styles.title}>
          {character === null ? '다다' : character.name}
        </h3>
      </Link>
      <Calendar24 onClick={onClick} />
    </div>
  );
};

export default ChatHeader;
