import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View, AsyncStorage, Keyboard, ToastAndroid } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'
const { server } = require('../config/keys');
import DateTimePicker from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';

export default class Inicio extends Component {

    static navigationOptions = {
        title: 'Inicio',
    };


    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            estado: '',
        }

        this.Redirigir();
    }

    Redirigir = async () => {
        // await AsyncStorage.removeItem('usuario');
        let session = await AsyncStorage.getItem('usuario');
        let sessionParce = JSON.parse(session);
        if (session === null) {
            this.props.navigation.navigate('Login');
        } else {
            console.log(sessionParce)
            if (sessionParce.tipo == 0){
                this.props.navigation.navigate('modoTablet');
            }
            else {
                this.props.navigation.navigate('lista_empresas');
            }
        }
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.titulo} >Lista de tareas</Text>
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