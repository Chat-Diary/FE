import { ReactNode } from 'react';
import { getAi } from './globalProfiles';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface IMessage {
  chatId: number;
  sender: string;
  content: string | ReactNode;
  createAt: string;
  chatType: string;
}

interface ISection {
  [key: string]: IMessage[];
}

export const saveMessagesToLocalStorage = (messages: IMessage[]) => {
  localStorage.setItem('chatData', JSON.stringify(messages));
};

export const getAiEnglish = () => {
  const aiCharacter = getAi();
  if (!aiCharacter) {
    return 'DADA';
  }
  let ai = '';
  const { name } = aiCharacter;
  switch (name) {
    case '다다':
      ai = 'DADA';
      break;
    case '루루':
      ai = 'LULU';
      break;
    case '치치':
      ai = 'CHICHI';
      break;
  }
  return ai;
};

export const makeSection = (messages: IMessage[]) => {
  const sections: ISection = {};

  messages.forEach((m) => {
    const dateObj = parseISO(m.createAt);
    const monthDate = format(dateObj, 'yyyy.MM.dd EEEE', { locale: ko });
    if (sections[monthDate]) {
      sections[monthDate].push(m);
    } else {
      sections[monthDate] = [m];
    }
  });
  return sections;
};
