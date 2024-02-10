import { create } from 'zustand';
import { Diary } from '../utils/diary';

interface ITagStore {
  tags: string[];
  diaryList: Diary[];
  setTags: (newArray: string[]) => void;
  setDiaryList: (newArray: Diary[]) => void;
}

const useTagStore = create<ITagStore>((set) => ({
  tags: [],
  diaryList: [],
  setTags: (newArray) => set({ tags: newArray }),
  setDiaryList: (newArray) => set({ diaryList: newArray }),
}));

export default useTagStore;