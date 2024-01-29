export interface character {
  id: number;
  name: string;
  sub: string;
  first_tag: string;
  second_tag: string;
}

// 기본값 설정 위한 export
export const dada: character = {
  id: 0,
  name: '다다',
  sub: '안녕 나는 다다! \n 오늘 하루는 어땠어? 네 이야기를 들려줘!',
  first_tag: '#공감만렙',
  second_tag: '#수다스러운',
};

const chichi: character = {
  id: 1,
  name: '치치',
  sub: '안녕 나는 치치야 \n 오늘은 뭐하고 지냈어? 나한테 다 알려줘!',
  first_tag: '#활발',
  second_tag: '#호기심 가득',
};

const lulu: character = {
  id: 2,
  name: '루루',
  sub: '안녕? 나는 루루야 \n 오늘 하루도 수고했어',
  first_tag: '#차분한',
  second_tag: '#어른스러운',
};

const aiCharacters: character[] = [dada, chichi, lulu];

// export const setAi = (id: number) => {
//   if (aiCharacters) {
//     // localStorage.setItem('aiCharacters', JSON.stringify(aiCharacters));
//     localStorage.setItem('currentCharacter', id.toString());
//     const currentCharacter = aiCharacters[id];
//     return currentCharacter;
//   }
// };

export const getAi = (): character | null => {
  const aiString = localStorage.getItem('currentCharacter');
  if (aiString === null) {
    return null;
  }

  const aiIndex = parseInt(aiString, 10) - 1;
  if (isNaN(aiIndex)) return null;
  // // const aiIndex = aiString ? (JSON.parse(aiString) as number) : null;
  // const aiIndex = JSON.parse(aiString) as number;
  return aiCharacters[aiIndex];
};

export const getIndexAi = (id: number) => {
  return aiCharacters[id];
};

export const setAi = (id: number) => {
  localStorage.setItem('currentCharacter', (id + 1).toString());
  const newCharacter = aiCharacters[id];
  return newCharacter;
};

export const clearAi = () => {
  localStorage.removeItem('currentCharacter');
};
