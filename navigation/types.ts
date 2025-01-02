import { GameSession, GameMode } from '../app/types';

export type RootStackParamList = {
  Welcome: undefined;
  GameMode: undefined;
  PlayerRegistration: {
    gameMode: GameMode;
  };
  GamePlay: {
    players: Array<{ name: string; traits: string[] }>;
    gameMode: GameMode;
  };
  Results: {
    gameSession: GameSession;
  };
}; 