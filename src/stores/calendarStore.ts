import create from 'zustand';

interface ICalendarStore {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const useCalendarStore = create<ICalendarStore>((set) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => set(() => ({ currentDate: date })),
}));

export default useCalendarStore;
