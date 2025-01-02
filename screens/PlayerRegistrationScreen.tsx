import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Button, Text, Card, IconButton, SegmentedButtons, ProgressBar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RouteProp } from '@react-navigation/native';
import { Portal, Modal, List } from 'react-native-paper';
import { traitCategories, predefinedTraits } from '../utils/personalityTraits';

type PlayerRegistrationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PlayerRegistration'>;
  route: RouteProp<RootStackParamList, 'PlayerRegistration'>;
};

const calculateProgress = (current: number, total: number): number => {
  const progress = current / total;
  return Number(Math.min(progress, 1).toFixed(2));
};

const TraitSelectionModal = ({ 
  visible, 
  onDismiss, 
  onSelect, 
  selectedTraits 
}: {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (trait: string) => void;
  selectedTraits: string[];
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <ScrollView>
          {Object.entries(traitCategories).map(([key, title]) => (
            <List.Section key={key}>
              <List.Subheader>{title}</List.Subheader>
              {predefinedTraits[key as keyof typeof predefinedTraits].map((trait) => (
                <List.Item
                  key={trait}
                  title={trait}
                  left={props => (
                    <List.Icon 
                      {...props} 
                      icon={selectedTraits.includes(trait) ? 'checkbox-marked' : 'checkbox-blank-outline'} 
                    />
                  )}
                  onPress={() => onSelect(trait)}
                  disabled={selectedTraits.includes(trait)}
                />
              ))}
            </List.Section>
          ))}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export const PlayerRegistrationScreen = ({ navigation, route }: PlayerRegistrationScreenProps) => {
  const { gameMode } = route.params;
  const [playerCount, setPlayerCount] = useState<string>('3');
  const [currentStep, setCurrentStep] = useState<'count' | 'names' | 'traits'>('count');
  const [players, setPlayers] = useState<Array<{
    name: string;
    traits: string[];
  }>>([]);
  const [currentName, setCurrentName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayerCountSelection = (count: string) => {
    setPlayerCount(count);
    setCurrentStep('names');
  };

  const addPlayer = () => {
    if (currentName.trim()) {
      setPlayers([...players, { name: currentName.trim(), traits: [] }]);
      setCurrentName('');
      if (players.length + 1 === parseInt(playerCount)) {
        setCurrentStep('traits');
      }
    }
  };

  const handleTraitSelect = (trait: string) => {
    const updatedPlayers = [...players];
    if (updatedPlayers[currentPlayerIndex].traits.length < 5) {
      updatedPlayers[currentPlayerIndex].traits.push(trait);
      setPlayers(updatedPlayers);
    }

    if (updatedPlayers[currentPlayerIndex].traits.length === 5) {
      setModalVisible(false);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        startGame();
      }
    }
  };

  const startGame = () => {
    navigation.navigate('GamePlay', { 
      players: players.map(p => ({
        name: p.name,
        traits: p.traits
      })),
      gameMode: gameMode
    });
  };

  const renderPlayerCountSelection = () => (
    <View style={styles.centerContent}>
      <Text style={styles.title}>Kaç Kişi Oynayacak?</Text>
      <View style={styles.playerCountContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playerCountScroll}
        >
          {[2, 3, 4, 5, 6, 7, 8].map((count) => (
            <Button
              key={count}
              mode={playerCount === count.toString() ? "contained" : "outlined"}
              onPress={() => handlePlayerCountSelection(count.toString())}
              style={styles.countButton}
              labelStyle={styles.countButtonLabel}
            >
              {count} Kişi
            </Button>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.subtitle}>
        Minimum 2, maksimum 8 oyuncu
      </Text>
    </View>
  );

  const renderPlayerNameInput = () => (
    <View style={styles.centerContent}>
      <View style={styles.playerInputContainer}>
        <Text style={styles.title}>Oyuncuları Ekle</Text>
        
        <ProgressBar 
          progress={calculateProgress(players.length, parseInt(playerCount))}
          color="#6200ee"
          style={styles.progressBar}
        />
        
        <Text style={styles.subtitle}>
          {players.length} / {playerCount} Oyuncu
        </Text>

        <TextInput
          label="Oyuncu İsmi"
          value={currentName}
          onChangeText={setCurrentName}
          style={styles.input}
        />
        
        <Button 
          mode="contained" 
          onPress={addPlayer} 
          style={styles.button}
        >
          Oyuncu Ekle
        </Button>

        <View style={styles.playerListContainer}>
          <ScrollView style={styles.playerList}>
            {players.map((player, index) => (
              <Card key={index} style={styles.playerCard}>
                <Card.Content>
                  <View style={styles.playerRow}>
                    <Text style={styles.playerNumber}>{index + 1}.</Text>
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  const renderTraitInput = () => (
    <View style={styles.centerContent}>
      <View style={styles.traitInputContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            {players[currentPlayerIndex].name} için özellik seç
          </Text>
          <Text style={styles.subtitle}>
            {players[currentPlayerIndex].traits.length}/5 Özellik
          </Text>
          <ProgressBar 
            progress={calculateProgress(players[currentPlayerIndex].traits.length, 5)}
            color="#6200ee"
            style={styles.progressBar}
          />
          <Button 
            mode="contained" 
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            Özellik Seç
          </Button>
        </View>

        <View style={styles.traitsSection}>
          <ScrollView style={styles.traitList}>
            {players[currentPlayerIndex].traits.map((trait, index) => (
              <Card key={index} style={styles.traitCard}>
                <Card.Content>
                  <View style={styles.traitRow}>
                    <Text style={styles.traitNumber}>{index + 1}.</Text>
                    <Text style={styles.traitText}>{trait}</Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <TraitSelectionModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onSelect={handleTraitSelect}
          selectedTraits={players[currentPlayerIndex].traits}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentStep === 'count' && renderPlayerCountSelection()}
        {currentStep === 'names' && renderPlayerNameInput()}
        {currentStep === 'traits' && renderTraitInput()}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentedContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 10,
  },
  playerList: {
    maxHeight: 200,
  },
  playerCard: {
    marginBottom: 10,
  },
  traitContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSection: {
    paddingBottom: 10,
  },
  traitsSection: {
    flex: 1,
    marginTop: 10,
  },
  traitList: {
    flex: 1,
  },
  traitListContent: {
    paddingBottom: 20,
  },
  traitCard: {
    marginBottom: 8,
    elevation: 2,
  },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traitNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 25,
  },
  traitText: {
    fontSize: 16,
    flex: 1,
  },
  progressBar: {
    marginVertical: 10,
    height: 6,
    borderRadius: 3,
  },
  playerInputContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
  },
  playerListContainer: {
    marginTop: 20,
    height: 250,
    width: '100%',
  },
  playerList: {
    flex: 1,
  },
  playerCard: {
    marginBottom: 8,
    elevation: 2,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 25,
  },
  playerName: {
    fontSize: 16,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  traitInputContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    flex: 1,
    maxHeight: 600,
  },
  headerSection: {
    marginBottom: 20,
  },
  traitsSection: {
    flex: 1,
    maxHeight: 300,
  },
  playerCountContainer: {
    width: '100%',
    marginVertical: 20,
  },
  playerCountScroll: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countButton: {
    marginHorizontal: 5,
    minWidth: 80,
  },
  countButtonLabel: {
    fontSize: 16,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
}); 