import create from 'zustand';
import { IMessage } from '../utils/chattings';

interface ChatState {
  messages: IMessage[];
}
