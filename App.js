import React from 'react';
import { StackNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerNavigator } from 'react-navigation';

//vistas

import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import Signup2 from './src/componentes/registrarse2';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';
import modoTablet from './src/componentes/modo_tablet'
import lista_empresas from './src/componentes/lista_empresas'


const AppStack = createStackNavigator({ Inicio: Inicio});
const Tareas = createStackNavigator({ lista_empresas: lista_empresas,altaTarea: altaTarea});
const AuthStack = createStackNavigator({ Login: Login, Signup: Signup });
const AuthStack2 = createStackNavigator({ Signup2: Signup2 });

const modoEmpresa = createStackNavigator({ modoTablet: modoTablet });


export default createAppContainer(createSwitchNavigator(
  {
    Home: AppStack,
    Tareas: Tareas,
    Auth: AuthStack,
    Auth2: AuthStack2,
    empresa:modoEmpresa,
  }
));


