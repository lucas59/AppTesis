import React from 'react';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Login },
    Signup: { screen: Signup },
  }
);

export default createAppContainer(AppNavigator);
