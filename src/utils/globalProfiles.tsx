export interface character {
  id: number;
  name: string;
  sub: string;
  first_tag: string;
  second_tag: string;
}

const dada: character = {
  id: 0,
  name: '다다',
  sub: '안녕 나는 다다!<br />오늘 하루는 어땠어? 네 이야기를 들려줘!',
  first_tag: '#공감만렙',
  second_tag: '#수다스러운',
};

const chichi: character = {
  id: 1,
  name: '치치',
  sub: '안녕 나는 치치야!<br />오늘은 뭐하고 지냈어? 나한테 다 알려줘!',
  first_tag: '#활발',
  second_tag: '#호기심 가득',
};

const lulu: character = {
  id: 2,
  name: '루루',
  sub: '안녕? 나는 루루야<br />오늘 하루도 수고했어',
  first_tag: '#차분한',
  second_tag: '#어른스러운',
};

const aiCharacters: character[] = [dada, chichi, lulu];

export const setCharacters = () => {
  if (aiCharacters) {
    localStorage.setItem('aiCharacters', JSON.stringify(aiCharacters));
  }
};

export const changeCharacter = (id: number) => {
  const localData = localStorage.getItem('aiCharacters');
  const characters: character[] = localData ? JSON.parse(localData) : [];
  const newCharacter = characters[id];
  console.log(newCharacter);
};

// export const clearCharacters = () => {
//   localStorage.removeItem('aiCharacters');
// };
