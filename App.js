import React from 'react';
import { StackNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

//vistas

import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';

const AppStack = createStackNavigator({ Inicio: Inicio, altaTarea: altaTarea });
const AuthStack = createStackNavigator({ Login: Login, Signup: Signup });

export default createAppContainer(createSwitchNavigator(
  {
    Home: AppStack,
    Auth: AuthStack,
  }
));