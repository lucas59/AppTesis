import React from 'react';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import altaTarea from './src/componentes/Alta_tarea';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Login },
    Signup: { screen: Signup },
    altaTarea: { screen: altaTarea }
  }
);

export default createAppContainer(AppNavigator);
