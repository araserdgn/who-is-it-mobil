import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton, List } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { gameModes } from '../utils/gameModes';

type GameModeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameMode'>;
};

export const GameModeScreen = ({ navigation }: GameModeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      {gameModes.map((mode) => (
        <Card 
          key={mode.id} 
          style={styles.card}
          onPress={() => navigation.navigate('PlayerRegistration', { gameMode: mode })}
        >
          <Card.Content>
            <View style={styles.header}>
              <IconButton icon={mode.icon} size={24} />
              <Text style={styles.title}>{mode.name}</Text>
            </View>
            <Text style={styles.description}>{mode.description}</Text>
            <List.Section>
              <List.Subheader>Kurallar</List.Subheader>
              {mode.rules.map((rule, index) => (
                <List.Item
                  key={index}
                  title={rule}
                  left={() => <List.Icon icon="checkbox-marked-circle" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
}); 