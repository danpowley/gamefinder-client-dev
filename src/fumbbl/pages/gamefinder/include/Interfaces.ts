export interface Coach {
  id: number,
  name: string,
  ranking: string
}

export interface UserSettings {
  showUnofferableTeams: boolean,
  audio: boolean,
  hiddenCoaches: Coach[],
  zenMode: boolean,
};

// Expand to add more values using Typescript pipe (|) syntax
// e.g. = 'gamefinder.var1' | 'gamefinder.var2' | 'gamefinder.var3'
export type GameFinderVar = 'gamefinder.enableSound' | 'gamefinder.zenMode' | 'gamefinder.showUnofferableTeams';

export type LfgModeApi = 'Strict' | 'Mixed' | 'Open';
export type LfgModeUi = 'Blackbox only' | 'Gamefinder or Blackbox' | 'Gamefinder only';

export type BlackboxStatus = 'Paused' | 'Active' | 'Pending' | 'Offline';

export interface BlackboxConfig {
  pauseDuration: number,
  activeDuration: number,
}

export interface Blackbox {
  userActivated: boolean,
  status: BlackboxStatus,
  secondsRemaining: number,
  coachCount: number,
};

export type BlackboxDrawResult = 'SCHEDULED' | 'NOT_SCHEDULED' | 'PREVIOUSLY_SCHEDULED' | 'NOT_APPLICABLE';