import { create } from 'zustand';
import { IMessage } from '../utils/chattings';

interface IChatStore {
  messages: IMessage[];
  setMessages: (newArray: IMessage[]) => void;
  addPreviousMessage: (newMessage: IMessage[]) => void;
  addNextMessage: (newMessage: IMessage[]) => void;
  replaceLastMessage: (newMessage: IMessage) => void;
}

const useChatStore = create<IChatStore>((set) => ({
  messages: [],
  setMessages: (newArray) => set({ messages: newArray }),
  addPreviousMessage: (newMessages) => {
    set((state) => ({
      messages: [...newMessages, ...state.messages],
    }));
  },
  addNextMessage: (newMessages) => {
    set((state) => ({
      messages: [...state.messages, ...newMessages],
    }));
  },
  replaceLastMessage: (newMessage) => {
    set((state) => {
      const updatedMessages = [...state.messages];
      updatedMessages.pop();
      updatedMessages.push(newMessage);
      return { messages: updatedMessages };
    });
  },
}));

export default useChatStore;
