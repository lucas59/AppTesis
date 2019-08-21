import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Keyboard, AsyncStorage } from 'react-native';
const { server } = require('../config/keys');
import { ListItem, Icon, Divider } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import moment from "moment";

export default class lista_tareas extends Component {
    static navigationOptions = {
        title: 'Listas de tareas',
        headerStyle: {
            backgroundColor: '#1E8AF1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <Icon
                reverse
                name='face'
                type='material'
                color='#1E8AF1'
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
        let session = await AsyncStorage.getItem('usuario');
        let sesion = JSON.parse(session);
        let tarea_send = {
           id: sesion.id
        }
        await fetch(server.api + '/Tareas/ListaTareas', {
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
                //fecha de inicio y de fin de la tarea
                var dia_inicio = new Date(data.inicio);
                var dia_fin = new Date(data.fin);

                //fecha pasa de Date a moment
                const moment_inicio = moment(dia_inicio);
                const moment_final = moment(dia_fin);

                //obtener las horas, minutos y segundos
                const segundos = moment_inicio.diff(moment_final, 'seconds');
                const minutos = moment_inicio.diff(moment_final, 'minutes');
                const horas = moment_inicio.diff(moment_final, 'hour');

                //setear la fecha de la tarea en una variable para luego compararla con la fecha de la tarea actual
                var comp = fecha;

                //fecha es igual a la fecha de la tarea actual
                fecha = moment(dia_inicio).format('MMMM Do YYYY');
                return (
                    <View key={i}>
                        {comp != moment(dia_inicio).format('MMMM Do YYYY') ? <Text style={{marginTop: 5, marginLeft: 10, fontSize: 15 }}>{moment(dia_inicio).format('ddd, Do MMMM')}</Text> : null}
                        <ListItem
                            leftIcon={{ name: 'assignment' }}
                            title={data.titulo}
                            rightTitle={horas + "h " + minutos + "m " + segundos + "s"}
                            onPress={() => Alert.alert(
                                "Opciones",
                                "de tarea " + data.titulo,
                                [
                                    { text: "Modificar", onPress: () => this.redireccionar_modificar(data.id, data.inicio, data.fin, data.titulo) },
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


    redireccionar_modificar = async (id, inicio, fin, titulo) => {
        var myArray = [id, inicio, fin, titulo];
        AsyncStorage.setItem('tarea_mod', JSON.stringify(myArray));
        this.props.navigation.navigate('modificar_tarea');
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