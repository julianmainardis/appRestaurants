import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { NewOrderScreen } from '../screens/NewOrderScreen';
import { Product } from '../interfaces/productsInterface';
import { KitchenHomeScreen } from '../screens/KitchenHomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ManagerHomeScreen } from '../screens/ManagerHomeScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Product;
  NewOrderScreen: undefined;
  KitchenHomeScreen: undefined;
  LoginScreen: undefined;
  ManagerHomeScreen: undefined;
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
      <Stack.Screen name="KitchenHomeScreen" component={KitchenHomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ManagerHomeScreen" component={ManagerHomeScreen} />
    </Stack.Navigator>
  );
}