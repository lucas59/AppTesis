import React from 'react';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Login },
    registrarse: { screen: Signup },
    altaTarea: { screen: altaTarea },
    Inicio: { screen: Inicio }
  }
);

export default createAppContainer(AppNavigator);
