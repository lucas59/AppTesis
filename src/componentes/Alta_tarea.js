import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard,ToastAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
const { server } = require('../config/keys');
import DateTimePicker from "react-native-modal-datetime-picker";
export default class Alta_tarea extends Component {

    static navigationOptions = {
        title: 'Alta tarea',
    };

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            estado: '',
            inicio: '',
            fin: '',
            isDateTimePickerVisible_inicio: false,
            isDateTimePickerVisible_fin: false
        }
    }

    logout = async()=>{
        AsyncStorage.removeItem('usuario');
        ToastAndroid.show('Session cerrada.', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
    }

    saveData = async () => {
        Keyboard.dismiss();

        const { titulo, estado, inicio, fin } = this.state;
        let loginDetails = {
            titulo: titulo,
            estado: estado,
            inicio: inicio,
            fin: fin
        }
        console.log(loginDetails);
        fetch(server.api + 'Alta_tarea', {
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

    }

    showData = async () => {
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: ' + ld.email + ' ' + 'password: ' + ld.password);
    }

    showDateTimePicker_inicio = () => {
        this.setState({ isDateTimePickerVisible_inicio: true });
    };

    hideDateTimePicker_inicio = () => {
        this.setState({ isDateTimePickerVisible_inicio: false });
    };

    showDateTimePicker_fin = () => {
        this.setState({ isDateTimePickerVisible_fin: true });
    };

    hideDateTimePicker_fin = () => {
        this.setState({ isDateTimePickerVisible_fin: false });
    };

    handleDatePicked_inicio = pickeddate => {
  /*      this.setState({ inicio: pickeddate })
        const value = await AsyncStorage.getItem('usuario');
        this.hideDateTimePicker_inicio();*/
    };

    handleDatePicked_fin = pickeddate => {
        this.setState({ fin: pickeddate })
        this.hideDateTimePicker_inicio();
        this.hideDateTimePicker_fin();
    };
    render() {
        return (

            <>
                <View style={styles.container}>
                    <TextInput style={styles.inputBox}
                        onChangeText={(titulo) => this.setState({ titulo })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Titulo de la tarea"
                        placeholderTextColor="#002f6c"
                        selectionColor="#fff"
                    />

                    <TextInput style={styles.inputBox}
                        onChangeText={(estado) => this.setState({ estado })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Descripción de la tarea"
                        placeholderTextColor="#002f6c"
                    />


                    <Button title="Dia y hora de inicio" onPress={this.showDateTimePicker_inicio} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible_inicio}
                        onConfirm={(date) => this.handleDatePicked_inicio(date)}
                        onCancel={this.hideDateTimePicker_inicio}
                        mode={'datetime'}
                    />
                    <Button title="Dia y hora del final" onPress={this.showDateTimePicker_fin} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible_fin}
                        onConfirm={this.handleDatePicked_fin}
                        onCancel={this.hideDateTimePicker_fin}
                        mode={'datetime'}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.saveData}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.logout }>Cerrar Session momentaneo</Text>
                    </TouchableOpacity>
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
