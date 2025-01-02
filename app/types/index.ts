// Type definitions
export interface Player {
  id: string;
  name: string;
  traits: string[];
}

export interface PersonalityDescription {
  id: string;
  description: string;
  assignedTo?: string;
  correctPlayer: string;
  isCustomTrait: boolean;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string; // Material icon ismi
  questionCount: number;
  timeLimit?: number;
  pointSystem: {
    correctGuess: number;
    customTraitGuess: number;
    streak: number;
  };
  rules: string[];
}

export interface GameSession {
  players: Player[];
  descriptions: PersonalityDescription[];
  currentRound: number;
  scores: Record<string, number>;
  totalQuestions: number;
  gameMode: GameMode;
  streakCount?: number;
  timeRemaining?: number;
}

// Default export with type definitions
const Types = {
  Player: {} as Player,
  PersonalityDescription: {} as PersonalityDescription,
  GameSession: {} as GameSession,
};

export default Types; 