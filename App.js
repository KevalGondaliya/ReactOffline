import 'react-native-gesture-handler';

import * as React from 'react';
import {Button, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AddProduct from './src/screens/AddProduct';
import Cart from './src/screens/Cart';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#f12761',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            title: 'Add Product',
            headerStyle: {
              backgroundColor: '#f12761',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Cart',
            headerStyle: {
              backgroundColor: '#f12761',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
