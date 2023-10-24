import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';
import { NewOrderScreen } from '../screens/NewOrderScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
  NewOrderScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="NewOrderScreen" component={NewOrderScreen} />
    </Stack.Navigator>
  );
}