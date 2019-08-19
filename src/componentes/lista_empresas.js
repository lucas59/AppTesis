import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, AsyncStorage, Keyboard } from 'react-native';
const { server } = require('../config/keys');
import { ListItem, Icon} from 'react-native-elements';
export default class lista_empresas extends Component {

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
            titulo: '',
            estado: '',
            inicio: '',
            fin: '',
            listaT: '',
        }
        this.Listar();
    }




    Listar = async () => {
        Keyboard.dismiss();
        await fetch(server.api + '/Tareas/ListaEmpresas', {
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

    redireccionar_alta = async (id, nombre) => {
        var myArray = [id, nombre];
        AsyncStorage.setItem('empresa', JSON.stringify(myArray));
        this.props.navigation.navigate('lista_tareas');
    }

    parseData() {
        if (this.state.listaT) {
            return this.state.listaT.map((data, i) => {
                return (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: data.fotoPerfil } }}
                        title={data.nombre}
                        onPress={() => this.redireccionar_alta(data.id, data.nombre)}
                    />
                )
            })
        }
    }
    render() {
        return (
            <>
               <ScrollView>
                    <Text style={styles.titulo} >Lista de Empresas</Text>
                    {this.parseData()}
                </ScrollView>


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
    screen: {
        backgroundColor: '#3D3D3D',
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        //padding: 10
    },
});