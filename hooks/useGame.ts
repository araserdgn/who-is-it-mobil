import { useState, useCallback } from 'react';
import { Player, PersonalityDescription, GameSession, GameMode } from '../app/types';
import { traitQuestions } from '../utils/traitQuestions';

export const useGame = () => {
  const [gameSession, setGameSession] = useState<GameSession>({
    players: [],
    descriptions: [],
    currentRound: 0,
    scores: {},
    totalQuestions: 10,
    gameMode: {
      id: 'classic',
      name: 'Klasik Mod',
      description: 'Temel oyun modu',
      icon: 'stars',
      questionCount: 10,
      pointSystem: {
        correctGuess: 1,
        customTraitGuess: 2,
        streak: 0
      },
      rules: []
    },
    streakCount: 0
  });

  const generateDescriptions = useCallback((players: Player[]) => {
    // Oyuncuların seçtiği özellikleri kullan
    const customTraits: PersonalityDescription[] = players.flatMap(player => 
      player.traits.map(trait => {
        const traitQuestion = traitQuestions[trait];
        // Özellik için özel soru varsa rastgele bir tanesini seç, yoksa default soru kullan
        const question = traitQuestion 
          ? traitQuestion.questions[Math.floor(Math.random() * traitQuestion.questions.length)]
          : `Bu kişilik özelliği kime ait?\n${trait}`;

        return {
          id: `desc-${Math.random()}`,
          description: question,
          correctPlayer: player.id,
          isCustomTrait: true
        };
      })
    );

    // Rastgele özellikler için de soru şablonlarını kullan
    const defaultDescriptions: PersonalityDescription[] = players.map(player => {
      const availableTraits = Object.keys(traitQuestions)
        .filter(trait => !player.traits.includes(trait));
      
      const randomTrait = availableTraits[Math.floor(Math.random() * availableTraits.length)];
      const traitQuestion = traitQuestions[randomTrait];
      const question = traitQuestion.questions[
        Math.floor(Math.random() * traitQuestion.questions.length)
      ];

      return {
        id: `desc-${Math.random()}`,
        description: question,
        correctPlayer: player.id,
        isCustomTrait: false
      };
    });

    return [...customTraits, ...defaultDescriptions]
      .sort(() => Math.random() - 0.5)
      .slice(0, gameSession.totalQuestions);
  }, [gameSession.totalQuestions]);

  const startGame = useCallback((
    playerData: Array<{ name: string; traits: string[] }>, 
    gameMode: GameMode
  ) => {
    const players: Player[] = playerData.map(p => ({
      id: `player-${Math.random()}`,
      name: p.name,
      traits: p.traits,
    }));

    const initialScores: Record<string, number> = {};
    players.forEach((player) => {
      initialScores[player.id] = 0;
    });

    const descriptions = generateDescriptions(players);

    setGameSession({
      players,
      descriptions,
      currentRound: 0,
      scores: initialScores,
      totalQuestions: gameMode.questionCount,
      gameMode,
      streakCount: 0,
      timeRemaining: gameMode.timeLimit
    });
  }, [generateDescriptions]);

  const makeGuess = useCallback((descriptionId: string, playerId: string) => {
    setGameSession((prev) => {
      const description = prev.descriptions.find((d) => d.id === descriptionId);
      if (!description) return prev;

      const newScores = { ...prev.scores };
      
      // Boş string ile gelen tahminler (timeout durumu) için puan verme
      if (playerId === '') {
        return {
          ...prev,
          descriptions: prev.descriptions.map((d) =>
            d.id === descriptionId ? { ...d, assignedTo: playerId } : d
          ),
          currentRound: prev.currentRound + 1,
          streakCount: 0, // Seriyi sıfırla
        };
      }

      // Doğru tahmin durumu
      if (description.correctPlayer === playerId) {
        // Temel puan
        let points = prev.gameMode.pointSystem.correctGuess;
        
        // Özel özellik bonusu
        if (description.isCustomTrait) {
          points += prev.gameMode.pointSystem.customTraitGuess;
        }
        
        // Seri bonusu (streak mode için)
        if (prev.gameMode.id === 'streak') {
          const newStreakCount = (prev.streakCount || 0) + 1;
          points += (newStreakCount - 1) * prev.gameMode.pointSystem.streak;
          
          newScores[playerId] = (newScores[playerId] || 0) + points;
          
          return {
            ...prev,
            descriptions: prev.descriptions.map((d) =>
              d.id === descriptionId ? { ...d, assignedTo: playerId } : d
            ),
            scores: newScores,
            currentRound: prev.currentRound + 1,
            streakCount: newStreakCount,
          };
        }
        
        // Zaman bonusu (time mode için)
        if (prev.gameMode.id === 'time' && prev.timeRemaining) {
          const timeBonus = Math.floor(prev.timeRemaining / 5);
          points += timeBonus;
        }

        newScores[playerId] = (newScores[playerId] || 0) + points;
      }

      // Yanlış tahmin durumu
      return {
        ...prev,
        descriptions: prev.descriptions.map((d) =>
          d.id === descriptionId ? { ...d, assignedTo: playerId } : d
        ),
        scores: newScores,
        currentRound: prev.currentRound + 1,
        streakCount: 0, // Yanlış tahminde seriyi sıfırla
      };
    });
  }, []);

  return {
    gameSession,
    startGame,
    makeGuess,
  };
}; 