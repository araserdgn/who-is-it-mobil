import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { GameSession } from '../app/types';
import ConfettiCannon from 'react-native-confetti-cannon';

type ResultsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: {
    params: {
      gameSession: GameSession;
    };
  };
};

export const ResultsScreen = ({ navigation, route }: ResultsScreenProps) => {
  const { gameSession } = route.params;

  const sortedPlayers = [...gameSession.players].sort((a, b) => 
    (gameSession.scores[b.id] || 0) - (gameSession.scores[a.id] || 0)
  );

  const getCorrectGuessCount = (playerId: string) => {
    return gameSession.descriptions.filter(
      desc => desc.assignedTo === desc.correctPlayer && desc.assignedTo === playerId
    ).length;
  };

  const [showConfetti, setShowConfetti] = useState(true);

  const getPlayerStats = (playerId: string) => {
    const totalGuesses = gameSession.descriptions.filter(d => d.assignedTo === playerId).length;
    const correctGuesses = gameSession.descriptions.filter(
      d => d.assignedTo === playerId && d.assignedTo === d.correctPlayer
    ).length;
    
    return {
      totalGuesses,
      correctGuesses,
      accuracy: `${Math.round((correctGuesses / totalGuesses) * 100)}%`
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oyun Bitti!</Text>

      <Card style={styles.winnersCard}>
        <Card.Content>
          <Text style={styles.winnerTitle}>🏆 Kazanan 🏆</Text>
          <Text style={styles.winnerName}>
            {sortedPlayers[0].name}
          </Text>
          <Text style={styles.score}>
            {gameSession.scores[sortedPlayers[0].id]} puan
          </Text>
        </Card.Content>
      </Card>

      <ScrollView style={styles.scoresList}>
        <Text style={styles.subtitle}>Tüm Sonuçlar</Text>
        {sortedPlayers.map((player, index) => (
          <Card key={player.id} style={styles.playerCard}>
            <Card.Content>
              <View style={styles.playerRow}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerStats}>
                    Doğru Tahmin: {getCorrectGuessCount(player.id)}
                  </Text>
                </View>
                <Text style={styles.playerScore}>
                  {gameSession.scores[player.id]} puan
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Welcome')}
        style={styles.button}
      >
        Yeni Oyun
      </Button>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{x: -10, y: 0}}
          autoStart={true}
          fadeOut={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  winnersCard: {
    marginBottom: 20,
    backgroundColor: '#FFD700',
  },
  winnerTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  scoresList: {
    flex: 1,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerCard: {
    marginBottom: 10,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 30,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerStats: {
    fontSize: 14,
    color: '#666',
  },
  playerScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 'auto',
  },
}); 