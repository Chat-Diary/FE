import { create } from 'zustand';

interface IPath {
  prevPath: string;
  isHomeTypeList: boolean;
  isTagTypeList: boolean;
  setPage: (
    newPath: string,
    newHomeType: boolean,
    newTagsType: boolean,
  ) => void;
  getPage: () => [path: string, homeType: boolean, tagsType: boolean];
}

const initialPath = {
  prevPath: '/',
  isHomeTypeList: false,
  isTagTypeList: true,
};

export const usePageStore = create<IPath>((set, get) => ({
  prevPath: initialPath.prevPath,
  isHomeTypeList: initialPath.isHomeTypeList,
  isTagTypeList: initialPath.isTagTypeList,

  setPage: (newPath: string, newHomeType: boolean, newTagsType: boolean) =>
    set({
      prevPath: newPath,
      isHomeTypeList: newHomeType,
      isTagTypeList: newTagsType,
    }),

  getPage: () => {
    const path = get().prevPath;
    const homeType = get().isHomeTypeList;
    const tagsType = get().isTagTypeList;
    return [path, homeType, tagsType];
  },
}));

export default usePageStore;
