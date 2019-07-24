import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Signup from '../componentes/registrarse';
const { server } = require('../config/keys');

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
        console.log('asd', usuario);
        if (usuario === null) {
            alert('no session');
       //    this.props.navigator.navigate(Signup);
        } else {
            this.props.navigation.navigate('altaTarea');
            //navigator(Signup);
        }
    }


    //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    saveData = async () => {
        const { email, password } = this.state;
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
                    navigate(Signup);
                } else {
                    alert(retorno.mensaje);
                }
            })
            .catch(function (err) {
                console.log('error', err);
            })

        Keyboard.dismiss();
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
                    <Text style={styles.buttonText} onPress={this.saveData /*()=>this.saveData}>{this.props.type*/}></Text>
                </TouchableOpacity>
            </View>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
