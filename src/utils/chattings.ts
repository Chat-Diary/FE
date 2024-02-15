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

export const resizeImage = (
  url: string,
  maxWidth: number,
  maxHeight: number,
  callback: (resizedUrl: string) => void,
) => {
  const img = new Image();
  img.onload = () => {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL('image/jpeg', 0.7));
  };
  img.src = url;
};

export const dataUrlToBlob = (dataUrl: string) => {
  const byteString = atob(dataUrl.split(',')[1]);
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mimeString });
};
