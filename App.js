import React from 'react';
import { StackNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerNavigator } from 'react-navigation';

//vistas

import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import Signup2 from './src/componentes/registrarse2';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';
import modoTablet from './src/componentes/empresa'
import Profile from './src/componentes/perfil'


const drawer = createDrawerNavigator(
  {
    Home: Inicio,
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  }
);


const AppStack = createStackNavigator({ Inicio: Inicio, altaTarea: altaTarea, perfil:Profile });
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


