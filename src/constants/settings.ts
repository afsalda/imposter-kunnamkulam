export interface GameSettings {
  timerDuration: 30 | 60 | 90 | null;  // null = no timer
  rounds: number;           // 1–10
  fakerCount: 1 | 2;
  allowSkipWord: boolean;
  showClueHistory: boolean;
  shufflePlayers: boolean;  // re-shuffle order each round
}

export const DEFAULT_SETTINGS: GameSettings = {
  timerDuration: 60,
  rounds: 3,
  fakerCount: 1,
  allowSkipWord: true,
  showClueHistory: true,
  shufflePlayers: true
};
