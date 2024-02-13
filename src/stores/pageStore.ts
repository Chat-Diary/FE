import { create } from 'zustand';

interface IPath {
  prevPath: string;
  prevList: boolean;
  setPage: (newPath: string, newList: boolean) => void;
  getPage: () => [page: string, list: boolean];
}

const initialPath = {
  prevPath: '/',
  prevList: false,
};

export const usePageStore = create<IPath>((set, get) => ({
  prevPath: initialPath.prevPath,
  prevList: initialPath.prevList,

  setPage: (newPath: string, newList: boolean) =>
    set({ prevPath: newPath, prevList: newList }),

  getPage: () => {
    const page = get().prevPath;
    const list = get().prevList;
    return [page, list];
  },
}));

export default usePageStore;
