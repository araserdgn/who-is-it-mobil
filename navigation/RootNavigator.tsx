import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { GameModeScreen } from '../screens/GameModeScreen';
import { PlayerRegistrationScreen } from '../screens/PlayerRegistrationScreen';
import { GamePlayScreen } from '../screens/GamePlayScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="GameMode" 
        component={GameModeScreen}
        options={{ 
          title: 'Oyun Modu Seç',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="PlayerRegistration" 
        component={PlayerRegistrationScreen}
        options={{ title: 'Oyuncuları Ekle' }}
      />
      <Stack.Screen 
        name="GamePlay" 
        component={GamePlayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}; 