import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ToastAndroid } from 'react-native';
import Signup from '../componentes/registrarse';
const { server } = require('../config/keys');
import styles from '../css/styleLogin';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Ingresar',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.checkSession();
    }
    checkSession = async () => {
        let usuario = await AsyncStorage.getItem('usuario');
        if (usuario != null) {
            this.props.navigation.navigate('altaTarea');
        }
    }

    openSignup = async () =>{
        this.props.navigation.navigate('registrarse');
    }


    saveData = async () => {
        Keyboard.dismiss();

        const { email, password } = this.state;

        if (email == "" || password == "") {
            ToastAndroid.show('Ingresa datos validos.', ToastAndroid.SHORT);
            return;
        }

        //save data with asyncstorage
        let loginDetails = {
            email: email,
            password: password
        }

        fetch(server.api + 'login', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const retorno = data;
                console.log(retorno.mensaje);
                if (retorno.retorno == true) {
                    alert("Exito");
                    AsyncStorage.setItem('usuario', JSON.stringify(loginDetails));
                    this.props.navigation.navigate('altaTarea');
                } else {
                    alert(retorno.mensaje);
                    //  this.props.navigation.navigate('registrarse')

                }
            })
            .catch(function (err) {
                console.log('error', err);
            })

    }

    showData = async () => {
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: ' + ld.email + ' ' + 'password: ' + ld.password);
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({ email })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()} />

                <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#002f6c"
                    ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.saveData}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text onPress={this.openSignup}>Crear mi cuenta</Text>
                </TouchableOpacity>
            </View>

        )
    }


}
