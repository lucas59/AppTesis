import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Keyboard } from 'react-native';
const { server } = require('../config/keys');
import { ListItem, Icon, Divider } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import moment from "moment";

export default class lista_tareas extends Component {
    static navigationOptions = {
        title: 'TINE',
        headerStyle: {
            backgroundColor: '#1E8AF1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <Icon
                name='face'
                type='material'
                color='white'
                onPress={() => console.log('perfil')} />
        ),

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
        if (this.state.listaT) {
            var fecha = null;
            return this.state.listaT.map((data, i) => {
                var dia_inicio = new Date(data.inicio);
                var dia_fin = new Date(data.fin);
                const a = moment(dia_inicio);
                const b = moment(dia_fin);
                const segundos = a.diff(b, 'seconds');
                const minutos = a.diff(b, 'minutes');
                const horas = a.diff(b, 'hour');
                var comp = fecha;
                fecha = moment(dia_fin).format('MMMM Do YYYY');
                return (
                    <View key={i}>
                        {comp != moment(dia_fin).format('MMMM Do YYYY') ? <Text>{moment(dia_inicio).locale('fr').format('MMMM Do YYYY')}</Text> : null}

                        <ListItem
                            leftIcon={{ name: 'assignment' }}
                            title={data.titulo}
                            rightTitle={horas + "h " + minutos + "m " + segundos + "s"}
                            onPress={() => Alert.alert(
                                "Opciones",
                                "de tarea " + data.titulo,
                                [
                                    { text: "Modificar", onPress: () => console.log("modificado") },
                                    {
                                        text: "Eliminar",
                                        onPress: () => console.log("eliminado"),
                                        style: "cancel"
                                    },
                                ],
                                { cancelable: true }
                            )
                            }

                        />

                    </View>

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
                <Text style={styles.titulo}>Lista de tareas</Text>
                <ScrollView>
                    {this.parseData()}
                </ScrollView>
                <FloatingAction
                    style={styles.floatante}
                    actions={actions}
                    onPressItem={name => { this.redireccionar_alta(name) }}
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
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});