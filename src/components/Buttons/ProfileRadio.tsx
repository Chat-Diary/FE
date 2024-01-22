import styles from './ProfileRadio.module.scss';
import ChangeRadioBtn from './ChangeRadioBtn';
import { getIndexAi } from '../../utils/globalProfiles';
import { ReactNode } from 'react';

interface IProfileRadio {
  id: number;
  imgs: ReactNode[];
  onClick: (id: number) => void;
}
const ProfileRadio = ({ id, imgs, onClick }: IProfileRadio) => {
  const ai = getIndexAi(id);

  return (
    <div className={styles.radioContainer}>
      <div>
        <div>{imgs[id]}</div>
        <span className={styles.name}>{ai.name}</span>
      </div>
      <div className={styles.tags}>
        <span>{ai.first_tag}</span>
        <span>{ai.second_tag}</span>
        <ChangeRadioBtn id={id} onChange={onClick} />
      </div>
    </div>
  );
};

export default ProfileRadio;
