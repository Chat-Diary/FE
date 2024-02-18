import { create } from 'zustand';

interface IDateStore {
  year: number;
  month: number;
  day: number;
  setYear: (newYear: number) => void;
  setMonth: (newMonth: number) => void;
  setDay: (newDay: number) => void;
}

const useDateStore = create<IDateStore>((set) => ({
  year: 2020,
  month: 1,
  day: 1,
  setYear: (newYear) => set({ year: newYear }),
  setMonth: (newMonth) => set({ month: newMonth }),
  setDay: (newDay) => set({ day: newDay }),
}));

export default useDateStore;
