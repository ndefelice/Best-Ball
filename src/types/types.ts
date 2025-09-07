export type User = {
  displayName: string;
  ovrRank?: number;
  leagueRank?: number;
  userAvatar?: string;
  leagueId: string;
  userId: string;
  roster: string[];
  rosterId: string;
  totalPoints: number;
  week1Pts?: number;
  week2Pts?: number;
  week3Pts?: number;
  week4Pts?: number;
  week5Pts?: number;
  week6Pts?: number;
  week7Pts?: number;
  week8Pts?: number;
  week9Pts?: number;
  week10Pts?: number;
  week11Pts?: number;
  week12Pts?: number;
  week13Pts?: number;
  week14Pts?: number;
  week15Pts?: number;
  week16Pts?: number;
  week17Pts?: number;
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
  prevOvrRank?: number;
  userAvatar?: string;
  leagueId: string;
  userId: string;
  roster: string[];
  totalPoints: number;
  rosterId: string;
  detailedRoster: Array<{
    map(arg0: (player: any) => any): any;
    playerId: string;
    playerName: string;
    team?: string;
    position: string;
    status: string;
    week1?: number;
    week2?: number;
    week3?: number;
    week4?: number;
    week5?: number;
    week6?: number;
    week7?: number;
    week8?: number;
    week9?: number;
    week10?: number;
    week11?: number;
    week12?: number;
    week13?: number;
    week14?: number;
    week15?: number;
    week16?: number;
    week17?: number;
  }>;
  // Weekly points
  week1Pts?: number;
  week2Pts?: number;
  week3Pts?: number;
  week4Pts?: number;
  week5Pts?: number;
  week6Pts?: number;
  week7Pts?: number;
  week8Pts?: number;
  week9Pts?: number;
  week10Pts?: number;
  week11Pts?: number;
  week12Pts?: number;
  week13Pts?: number;
  week14Pts?: number;
  week15Pts?: number;
  week16Pts?: number;
  week17Pts?: number;
};
