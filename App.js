import React from 'react';
import { StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

//vistas

import Login from './src/componentes/login';
import Signup from './src/componentes/registrarse';
import altaTarea from './src/componentes/Alta_tarea';
import Inicio from './src/componentes/Inicio';

///configuraciones de pantalla 

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Login },
    registrarse: { screen: Signup },
    altaTarea: { screen: altaTarea },
    Inicio: { screen: Inicio }
  }
);

metodo = () =>{
  console.log('metodo');
}

metodo();
export default createAppContainer(AppNavigator);
