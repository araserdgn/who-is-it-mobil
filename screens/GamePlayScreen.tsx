import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Text, RadioButton, ActivityIndicator, ProgressBar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../hooks/useGame';
import * as Haptics from 'expo-haptics';
import { RouteProp } from '@react-navigation/native';

type GamePlayScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GamePlay'>;
  route: RouteProp<RootStackParamList, 'GamePlay'>;
};

export const GamePlayScreen = ({ navigation, route }: GamePlayScreenProps) => {
  const { gameSession, startGame, makeGuess } = useGame();
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerActive, setTimerActive] = useState(false);

  // Oyunu başlat
  useEffect(() => {
    if (route.params?.players && route.params?.gameMode) {
      startGame(route.params.players, route.params.gameMode);
    }
  }, []);

  // Oyun bitti mi kontrol et
  useEffect(() => {
    if (gameSession.currentRound >= gameSession.descriptions.length && gameSession.descriptions.length > 0) {
      setIsGameOver(true);
    }
  }, [gameSession.currentRound, gameSession.descriptions.length]);

  // Oyun bittiyse sonuç ekranına git
  useEffect(() => {
    if (isGameOver) {
      navigation.replace('Results', { gameSession });
    }
  }, [isGameOver]);

  // Timer'ı başlat
  useEffect(() => {
    if (gameSession.gameMode.timeLimit && currentDescription) {
      setTimeLeft(gameSession.gameMode.timeLimit);
      setTimerActive(true);
    }
  }, [gameSession.currentRound, currentDescription]);

  // Timer'ı yönet
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentDescription) {
      handleTimeout();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timeLeft, currentDescription]);

  const handleTimeout = useCallback(() => {
    if (!currentDescription) return;

    setTimerActive(false);
    makeGuess(currentDescription.id, '');
    setSelectedPlayer('');
    
    if (gameSession.gameMode.timeLimit) {
      setTimeout(() => {
        setTimeLeft(gameSession.gameMode.timeLimit);
        setTimerActive(true);
      }, 500);
    }
  }, [currentDescription, makeGuess, gameSession.gameMode.timeLimit]);

  const currentDescription = gameSession.descriptions[gameSession.currentRound];

  const handleGuess = async () => {
    setTimerActive(false); // Timer'ı durdur
    if (selectedPlayer && currentDescription) {
      const isCorrect = currentDescription.correctPlayer === selectedPlayer;
      setIsCorrectGuess(isCorrect);
      setShowFeedback(true);
      
      // Haptic feedback
      if (isCorrect) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      makeGuess(currentDescription.id, selectedPlayer);
      setSelectedPlayer('');
      
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  // Timer göstergesini render et
  const renderTimer = () => {
    if (!gameSession.gameMode.timeLimit) return null;

    // timeLeft'i tam sayıya yuvarla
    const currentTime = Math.max(0, Math.floor(timeLeft));
    
    // Progress değerini 0-1 arasında tamsayı olarak hesapla
    const progress = Math.floor((currentTime / gameSession.gameMode.timeLimit) * 10) / 10;

    return (
      <View style={styles.timerContainer}>
        <Card style={[styles.timerCard, currentTime <= 5 && styles.timerWarning]}>
          <Card.Content>
            <Text style={styles.timerText}>{currentTime}</Text>
          </Card.Content>
        </Card>
        <ProgressBar 
          progress={progress}
          color={currentTime <= 5 ? '#ff4444' : '#6200ee'}
          style={styles.timerProgress}
        />
      </View>
    );
  };

  if (!currentDescription || isGameOver) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Tur Göstergesi */}
        <Card style={styles.roundCard}>
          <Card.Content>
            <Text style={styles.round}>
              Tur {gameSession.currentRound + 1}/{gameSession.descriptions.length}
            </Text>
          </Card.Content>
        </Card>

        {/* Timer */}
        {renderTimer()}

        {/* Soru Kartı */}
        <Card style={styles.questionCard}>
          <Card.Content>
            <Text style={styles.description}>
              {currentDescription.description}
            </Text>
          </Card.Content>
        </Card>

        {/* Oyuncu Listesi */}
        <View style={styles.playersContainer}>
          <ScrollView>
            <RadioButton.Group
              onValueChange={value => setSelectedPlayer(value)}
              value={selectedPlayer}
            >
              {gameSession.players.map((player) => (
                <Card key={player.id} style={styles.playerCard}>
                  <Card.Content>
                    <View style={styles.playerRow}>
                      <RadioButton value={player.id} />
                      <Text style={styles.playerName}>{player.name}</Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </RadioButton.Group>
          </ScrollView>
        </View>

        {/* Tahmin Butonu */}
        <Button
          mode="contained"
          onPress={handleGuess}
          disabled={!selectedPlayer}
          style={styles.button}
        >
          Tahmin Et
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  roundCard: {
    backgroundColor: '#6200ee',
    marginBottom: 10,
    alignSelf: 'center',
    minWidth: 120,
  },
  round: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  questionContainer: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 120,
    justifyContent: 'center',
  },
  questionCard: {
    elevation: 4,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    padding: 10,
  },
  playersContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  playerCard: {
    marginBottom: 8,
    elevation: 2,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerCard: {
    backgroundColor: '#6200ee',
    minWidth: 80,
    marginBottom: 5,
  },
  timerWarning: {
    backgroundColor: '#ff4444',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  timerProgress: {
    width: '80%',
    height: 4,
    borderRadius: 2,
  },
}); 