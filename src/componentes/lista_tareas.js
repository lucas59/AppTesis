import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Keyboard } from 'react-native';
const { server } = require('../config/keys');
import { ListItem } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";


export default class lista_tareas extends Component {
    static navigationOptions = {
        title: 'Inicio',
    };

    constructor(props) {
        super(props);
        this.state = {
            listaT: '',
        }
        this.Listar();
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
                if (retorno.retorno == true) {
                    this.setState({ listaT: retorno.mensaje });
                }
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }
    parseData() {
        console.log(this.state.listaT);
        if (this.state.listaT) {
            return this.state.listaT.map((data, i) => {
                return (
                    <ListItem
                        key={i}
                        leftIcon={{name : 'assignment'}}
                        title={data.titulo}
                    />
                )
            })
        }
        else {
            return (
                <Text style={{ textAlign: "center" }}>No existen tareas</Text>
            )
        }
    }

    redireccionar_alta = async (name) => {
        if (name == "bt_tarea") {
            this.props.navigation.navigate('altaTarea');
        }
        else {
            this.props.navigation.navigate('modoTablet');
        }
    }





    render() {
        const actions = [
            {
                text: "Alta tarea",
                icon: require("../imagenes/agregar_tarea.png"),
                name: "bt_tarea",
                position: 1
            },
            {
                text: "Alta asistencia",
                icon: require("../imagenes/agregar_asistencia.png"),
                name: "bt_asistencia",
                position: 2
            }
        ];


        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.titulo} >Lista de tareas</Text>
                    {this.parseData()}
                </View>
                <FloatingAction
                    style={styles.floatante}
                    actions={actions}
                    onPressItem={name => {this.redireccionar_alta(name)}}
                    showBackground={false}
                />
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
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
    },
    flotante: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ee6e73',
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});