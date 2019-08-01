import React from 'react';
import { StackNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

//vistas

import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import Signup2 from './src/componentes/registrarse2';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';
import modoTablet from './src/componentes/empresa'


const AppStack = createStackNavigator({ Inicio: Inicio, altaTarea: altaTarea });
const AuthStack = createStackNavigator({ Login: Login, Signup: Signup });
const AuthStack2 = createStackNavigator({ Signup2: Signup2 });

const modoEmpresa = createStackNavigator({ modoTablet: modoTablet });

export default createAppContainer(createSwitchNavigator(
  {
    Home: AppStack,
    Auth: AuthStack,
    Auth2: AuthStack2,
    empresa:modoEmpresa,
  }
));