import { create } from 'zustand';

interface IPath {
  prevPath: string;
  prevHomeType: boolean;
  prevTagsType: boolean;
  setPage: (
    newPath: string,
    newHomeType: boolean,
    newTagsType: boolean,
  ) => void;
  getPage: () => [path: string, homeType: boolean, tagsType: boolean];
}

const initialPath = {
  prevPath: '/',
  prevHomeType: false,
  prevTagsType: true,
};

export const usePageStore = create<IPath>((set, get) => ({
  prevPath: initialPath.prevPath,
  prevHomeType: initialPath.prevHomeType,
  prevTagsType: initialPath.prevTagsType,

  setPage: (newPath: string, newHomeType: boolean, newTagsType: boolean) =>
    set({
      prevPath: newPath,
      prevHomeType: newHomeType,
      prevTagsType: newTagsType,
    }),

  getPage: () => {
    const path = get().prevPath;
    const homeType = get().prevHomeType;
    const tagsType = get().prevTagsType;
    return [path, homeType, tagsType];
  },
}));

export default usePageStore;
