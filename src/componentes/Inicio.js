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

     Redirigir = async ()  =>{
         await AsyncStorage.removeItem('usuario');
        let session = await AsyncStorage.getItem('usuario');
        let sessionParce = JSON.parse(session);
        console.log(session);
        if (session===null) {
            this.props.navigation.navigate('Login');
        }else{
            console.log(sessionParce.tipo)
            if (sessionParce.tipo == 1) {
                this.props.navigation.navigate('altaTarea');
            }else{
                this.props.navigation.navigate('modoTablet');
            }
        }
    }

    render(){
        return(
            <View></View>
        );

    }

}
