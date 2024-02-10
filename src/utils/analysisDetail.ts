export interface TagDetailRanking {
  staryDate: string;
  endDate: string;
  statistics: TagCategory;
}

export interface TagCategory {
  감정: TagCounts[];
  전체: TagCounts[];
  행동: TagCounts[];
  인물: TagCounts[];
  장소: TagCounts[];
}

export interface TagCounts {
  count: number;
  tags: string[];
}