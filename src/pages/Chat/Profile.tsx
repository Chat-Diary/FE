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
import {
  changeAi,
  clearAi,
  setAi,
  getAi,
  dada,
} from '../../utils/globalProfiles';
import React from 'react';
import { character } from './../../utils/globalProfiles';

const imgB = [<Dada key={0} />, <Chichi key={1} />, <Lulu key={2} />];
const img48 = [<Dada48 key={0} />, <Chichi48 key={1} />, <Lulu48 key={2} />];

const Profile = () => {
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentAi, setCurrentAi] = useState<character>(dada);

  const [isAble, setIsAble] = useState<boolean>(false);
  const [checkedId, setCheckedId] = useState<number>(3);

  const navigate = useNavigate();

  const handleRadioChange = (id: number) => {
    setCheckedId(id);
  };

  const handleAiChange = (id: number) => {
    navigate('/chat');
    const newAi = changeAi(id);
    setCurrentAi(newAi);
  };

  useEffect(() => {
    const ai = getAi();

    if (ai) {
      setCurrentId(ai.id);
      setCurrentAi(ai);
    }

    if (checkedId === 3) {
      setIsAble(false);
    } else {
      setIsAble(true);
    }
  }, [checkedId]);

  return (
    <>
      <ChangeHeader>대화 상대 변경</ChangeHeader>
      <div className={styles.profileBefore}>
        {React.cloneElement(imgB[currentId], {
          style: { width: '160px', height: '160px' },
        })}
        {/* <Dada /> */}
        <span className={styles.name}>{currentAi.name}</span>
        <div className={styles.text}>
          {/* 안녕 나는 다다!
          <br />
          오늘 하루는 어땠어? 네 이야기를 들려줘! */}
          {currentAi.sub}
        </div>
        <div className={styles.tags}>
          <span>{currentAi.first_tag}</span>
          <span>{currentAi.second_tag}</span>
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
