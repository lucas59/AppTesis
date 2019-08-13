import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ToastAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation';
const { server } = require('../config/keys');
import { AppRegistry, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import * as Location from 'expo-location';
import { Permissions } from 'expo';

export default class Alta_tarea extends Component {

    static navigationOptions = {
        title: 'Alta tarea',
    };

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            inicio: '',
            fin: '',
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            long: '',
            lat: ''
        };
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
        
    }

    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
        var date = new Date();
        if (this.state.stopwatchStart == false) {
            this.setState({ inicio: date })
        } else {
            this.setState({ fin: date })
        }
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true });
        this.setState({ inicio: '' })
        this.setState({ fin: '' })
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };

    saveData = async () => {
        Keyboard.dismiss();
        let myArray = await AsyncStorage.getItem('empresa');
        let session = await AsyncStorage.getItem('usuario');
        let sesion = JSON.parse(session);
        let empresa_id = JSON.parse(myArray);
        await Permissions.askAsync(Permissions.LOCATION);
        var loc = await Location.getCurrentPositionAsync();
        var longitud = loc.coords.longitude;
        var latitud = loc.coords.latitude;
        this.setState({ long: longitud});
        this.setState({ lat: latitud});
        console.log(sesion.documento);
        console.log(myArray);
        const { titulo,  inicio, fin, long, lat } = this.state;
        let tarea_send = {
            titulo: titulo,
            inicio: inicio,
            fin: fin,
            long: long,
            lat: lat,
            empleado_id: sesion.id,
            empresa_id: empresa_id[0]
            
        }
        console.log(tarea_send);
        if (tarea_send.inicio == '' || tarea_send.fin == '') {
            alert("Inicie una tarea");
        }
        else if (tarea_send.titulo == '') {
            alert("Ingrese le nombre de la tarea");
        }
        else {
            fetch(server.api + 'Alta_tarea', {
                method: 'POST',
                headers: {
                    'Aceptar': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tarea_send)
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    const retorno = data;
                    console.log(retorno.mensaje);
                    if (retorno.retorno == true) {
                        alert("La tarea se dio de alta correctamente");
                        AsyncStorage.setItem('tarea', JSON.stringify(tarea_send));
                    } else {
                        alert(retorno.mensaje);
                    }
                })
                .catch(function (err) {
                    console.log('error', err);
                })
        }
    }
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
                    <Stopwatch laps msecs start={this.state.stopwatchStart}
                        reset={this.state.stopwatchReset}
                        options={options}
                        getTime={this.getFormattedTime} />
                    <TouchableHighlight onPress={this.toggleStopwatch}>
                        <Text style={{ fontSize: 30 }}>{!this.state.stopwatchStart ? "Iniciar" : "Parar"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.resetStopwatch}>
                        <Text style={{ fontSize: 30 }}>Reiniciar</Text>
                    </TouchableHighlight>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.saveData}>Aceptar</Text>
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    myButton: {
        padding: 5,
        height: 200,
        width: 200,  //The Width must be the same as the height
        borderRadius: 400, //Then Make the Border Radius twice the size of width or Height   
        backgroundColor: 'rgb(195, 125, 198)',

    }
});


const handleTimerComplete = () => alert("custom completion function");

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: 220,
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    }
};

