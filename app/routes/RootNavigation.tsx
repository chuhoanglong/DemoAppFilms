import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicketBookingScreen from 'app/screens/TicketBookingScreen';
import {AppStackParamList} from 'app/types/routes';
import TabBarComponent from './TabBar';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabbar" component={TabBarComponent} />
        <Stack.Screen
          name="TicketBookingScreen"
          component={TicketBookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
