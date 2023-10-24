import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { View } from 'react-native';

const App = () => {
    return (
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    )
}

export default App;
