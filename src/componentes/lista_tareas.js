import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, AsyncStorage, Keyboard } from 'react-native';
const { server } = require('../config/keys');
import { ListItem, ThemeProvider } from 'react-native-elements';

export default class lista_tareas extends Component {
    static navigationOptions = {
        title: 'Inicio',
    };

    constructor(props){
        super(props);
        this.state = {
            listaT: '',
        }
    }

    Listar = async() => {
        Keyboard.dismiss();
        await fetch(server.api + '/Tareas/ListaTareas', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const retorno = data;
            if(retorno.retorno == true){
                this.setState({ listaT: retorno.mensaje });
            }
            else{
                alert(retorno.mensaje);
            }
        })
        .catch(function (err){
            console.log('error', err);
        })

        mostrar_lista(){
            if(this.state.listaT){
                return this.state.listaT.map((data, i) => {
                    return (
                        <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: data.fotoPerfil } }}
                        title={data.nombre}
                        onPress={() => this.redireccionar_alta()}
                    />
                    )
                })
            }
        }
    }
}