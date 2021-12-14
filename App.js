/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/HomeScreen';

import ProductList from './pages/ProductListScreen'

const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{title: 'Welcome'}}
                />

                <Stack.Screen name="ProductList" component={ProductList}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
