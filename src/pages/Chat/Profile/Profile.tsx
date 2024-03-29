import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

import {
  Dada,
  Chichi,
  Lulu,
  Dada48,
  Chichi48,
  Lulu48,
} from '../../../assets/index';

import ChangeHeader from '../../../components/common/Header/ChangeHeader/ChangeHeader';
import ConfirmButton from '../../../components/common/Buttons/ConfirmBtn/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { setAi, getAi, dada } from '../../../utils/globalProfiles';
import React from 'react';
import { character } from '../../../utils/globalProfiles';
import ProfileRadio from '../../../components/common/Buttons/ChangeRadio/ProfileRadio';
import { formatFullDateToString } from '../../../utils/dateFormatters';
import useChatStore from '../../../stores/chatStore';
import { isLogin } from '../../../utils/user';

const imgB = [<Dada key={0} />, <Chichi key={1} />, <Lulu key={2} />];
const img48 = [<Dada48 key={0} />, <Chichi48 key={1} />, <Lulu48 key={2} />];

const Profile = () => {
  isLogin();
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentAi, setCurrentAi] = useState<character>(dada);

  const [isAble, setIsAble] = useState<boolean>(false);
  const [checkedId, setCheckedId] = useState<number>(3);

  const navigate = useNavigate();

  const { setMessages } = useChatStore();

  const handleRadioChange = (id: number) => {
    setCheckedId(id);
  };

  const handleAiChange = (id: number) => {
    navigate('/chat');
    const newAi = setAi(id);
    setCurrentAi(newAi);
    setMessages([
      {
        chatId: Date.now(),
        sender: 'SYSTEM',
        content: `채팅 대상이 '${newAi.name}' 로 변경되었습니다.`,
        createAt: formatFullDateToString(new Date()),
        chatType: 'SYSTEM',
      },
    ]);
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
      <ChangeHeader path={'/chat'}>대화 상대 변경</ChangeHeader>
      <div className={styles.profileBefore}>
        {React.cloneElement(imgB[currentId], {
          style: { width: '160px', height: '160px' },
        })}
        <span className={styles.name}>{currentAi.name}</span>
        <div className={styles.text}>{currentAi.sub}</div>
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
          <ProfileRadio
            id={(currentId + 1) % 3}
            imgs={img48}
            onClick={handleRadioChange}
          />
        </label>
        <label
          className={`${styles.chatProfile} ${
            checkedId === (((currentId + 1) % 3) + 1) % 3
              ? ''
              : styles.uncheckedLabel
          }`}
        >
          <ProfileRadio
            id={(((currentId + 1) % 3) + 1) % 3}
            imgs={img48}
            onClick={handleRadioChange}
          />
        </label>
      </div>
      <ConfirmButton isAble={isAble} id={checkedId} onClick={handleAiChange}>
        변경하기
      </ConfirmButton>
    </>
  );
};

export default Profile;
