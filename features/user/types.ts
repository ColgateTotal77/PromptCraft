export type UserStatsData = {
  improverUsageCount: number;
  extractorUsageCount: number;
  isPro: boolean;
  limit: number;
  profile: {
    username: string | null;
    avatar_url: string | null;
    email: string | null;
  };
};
