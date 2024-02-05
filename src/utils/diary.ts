export interface TagInfo {
  tagId: number;
  tagName: string;
}

export interface Diary {
  id: number;
  title: string;
  diaryDate: string;
  photoUrls: string[];
  tagList: TagInfo[];
}

export interface StreakDate {
  diaryStreakDate: number;
}
