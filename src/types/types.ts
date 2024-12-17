export type User = {
  displayName: string;
  ovrRank?: number;
  leagueRank?: number;
  userAvatar?: string;
  leagueId: string;
  userId: string;
  roster: string[];
  totalPoints: number;
};

export type PlayoffUser = {
  displayName: string;
  ovrRank?: number;
  userAvatar?: string;
  leagueId: string;
  userId: string;
  roster: string[];
  week: number;
  totalPoints: number;
  regSznPoints: number;
  eliminated: boolean;
  competing_for_third: boolean;
};

export type Draft = {
  draftId: string;
  leagueId: string;
  picks: Array<{
    ovr: number;
    round: number;
    slot: number;
    userId: string;
    playerId: string;
    playerName: string;
    playerPos: string;
    playerTeam: string;
    displayName: string;
  }>;
  year: number;
};

export type Player = {
  playerId: string;
  playerName: string;
  team?: string;
  position: string;
  status: string;
};

export type UserAndRoster = {
  displayName: string;
  ovrRank?: number;
  leagueRank?: number;
  userAvatar?: string;
  leagueId: string;
  userId: string;
  roster: string[];
  totalPoints: number;
  prevOvrRank?: number;
  detailedRoster: Array<
    Array<{
      playerId: string;
      playerName: string;
      team?: string;
      position: string;
      status: string;
    }>
  >;
};
