import React, { Component } from 'react';
import { PermissionsAndroid ,Button, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ToastAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'
const { server } = require('../config/keys');
import DateTimePicker from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';

export default class Alta_tarea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            estado: '',
            inicio: '',
            fin: '',
            isDateTimePickerVisible_inicio: false,
            isDateTimePickerVisible_fin: false,
            listaT: ''
        }
        this.Listar();
    }

    logout = async () => {
        AsyncStorage.removeItem('usuario');
        ToastAndroid.show('Session cerrada.', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
    }

    altaTarea = async () => {
        this.props.navigation.navigate('altaTarea');
    }


    Listar = async () => {
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
                console.log(retorno.retorno);
                if (retorno.retorno == true) {
                    console.log(retorno.mensaje);
                    this.setState({ listaT: retorno.mensaje });
                } else {
                    alert(retorno.mensaje);
                }
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }


    parseData() {
        if (this.state.listaT) {
            return this.state.listaT.map((data, i) => {
                return (
                    <View key={i} style={styles.lista}>
                        <Text>Titulo: {data.titulo}</Text>
                        <Text>Estado: {data.estado.data}</Text>
                        <Text>Fecha de inicio: {data.inicio}</Text>
                        <Text>Fecha de fin: {data.fin}</Text>
                    </View>
                )
            })
        }
    }
    render() {
        return (
            <>
                <NavBar>
                    <NavButton onPress={this.altaTarea}>
                        <NavButtonText>
                            {"Alta tarea"}
                        </NavButtonText>
                    </NavButton>
                    <NavTitle>
                        {"App"}
                    </NavTitle>
                    <NavButton onPress={this.logout}>
                        <NavButtonText>
                            {"Cerrar Sesión"}
                        </NavButtonText>
                    </NavButton>
                </NavBar>
                <View style={styles.container}>
                    <Text style={styles.titulo} >Lista de tareas</Text>
                    {this.parseData()}
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    lista: {
        marginTop: 5,
        marginBottom: 5
    }
});
