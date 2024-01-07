import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

import {
  Dada,
  Chichi,
  Lulu,
  Dada48,
  Chichi48,
  Lulu48,
} from '../../assets/index';

import ChangeHeader from '../../components/Headers/ChangeHeader';
import ChangeRadioBtn from '../../components/Buttons/ChangeRadioBtn';
import ConfirmButton from '../../components/Buttons/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { changeCharacter, setCharacters } from '../../utils/globalProfiles';

const Profile = () => {
  const currentId = 1;

  const [isAble, setIsAble] = useState<boolean>(false);
  const [checkedId, setCheckedId] = useState<number>(currentId);

  const navigate = useNavigate();

  const handleRadioChange = (id: number) => {
    setCheckedId(id);
  };

  const handleAiChange = (id: number) => {
    navigate('/chat');
    console.log(`${id}`);
    changeCharacter(id);
  };

  useEffect(() => {
    setCharacters();
    if (checkedId === currentId) setIsAble(false);
    else setIsAble(true);
  }, [checkedId]);

  return (
    <>
      <ChangeHeader>대화 상대 변경</ChangeHeader>
      <div className={styles.profileBefore}>
        <Dada />
        <span className={styles.name}>다다</span>
        <div className={styles.text}>
          안녕 나는 다다!
          <br />
          오늘 하루는 어땠어? 네 이야기를 들려줘!
        </div>
        <div className={styles.tags}>
          <span>#공감만렙</span>
          <span> #수다스러운</span>
        </div>
      </div>
      <div className={styles.profileAfter}>
        <label
          className={`${styles.chatProfile} ${
            checkedId === (currentId + 1) % 3 ? '' : styles.uncheckedLabel
          }`}
        >
          <div>
            <Chichi48 />
            <span className={styles.name}>치치</span>
          </div>
          <div className={styles.tags}>
            <span>#활발</span>
            <span>#호기심 가득</span>
            <ChangeRadioBtn
              id={(currentId + 1) % 3}
              onChange={handleRadioChange}
            />
          </div>
        </label>
        <label
          className={`${styles.chatProfile} ${
            checkedId === (((currentId + 1) % 3) + 1) % 3
              ? ''
              : styles.uncheckedLabel
          }`}
        >
          <div>
            <Lulu48 />
            <span className={styles.name}>루루</span>
          </div>
          <div className={styles.tags}>
            <span>#차분한</span>
            <span>#어른스러운</span>
            <ChangeRadioBtn
              id={(((currentId + 1) % 3) + 1) % 3}
              onChange={handleRadioChange}
            />
          </div>
        </label>
      </div>
      <ConfirmButton isAble={isAble} id={checkedId} onClick={handleAiChange}>
        변경하기
      </ConfirmButton>
    </>
  );
};

export default Profile;
