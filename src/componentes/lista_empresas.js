import React, { Component } from 'react';
import { StatusBar,  StyleSheet, Text, View, AsyncStorage, Keyboard, Icon } from 'react-native';
const { server } = require('../config/keys');
import { ListItem } from 'react-native-elements';
import DrawerLayout from 'react-native-drawer-layout';
import ActionBar from 'react-native-action-bar';
import Menu from './Menu';
export default class lista_empresas extends Component {

    tabs = [
        {
          key: 'games',
          icon: 'gamepad-variant',
          label: 'Games',
          barColor: '#388E3C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'movies-tv',
          icon: 'movie',
          label: 'Movies & TV',
          barColor: '#B71C1C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'music',
          icon: 'music-note',
          label: 'Music',
          barColor: '#E64A19',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        }
      ]
     
      renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
      )
     
      renderTab = ({ tab, isActive }) => (
        <FullTab
          isActive={isActive}
          key={tab.key}
          label={tab.label}
          renderIcon={this.renderIcon(tab.icon)}
        />
      )
    static navigationOptions = {
        headerStyle: {height: 0}
    };

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            estado: '',
            inicio: '',
            fin: '',
            listaT: '',
            drawerClosed: true,
        }
        this.Listar();
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.setDrawerState = this.setDrawerState.bind(this);
    }
    setDrawerState() {
        this.setState({
            drawerClosed: !this.state.drawerClosed,
        });
    }

    toggleDrawer = () => {
        if (this.state.drawerClosed) {
            this.DRAWER.openDrawer();
        } else {
            this.DRAWER.closeDrawer();
        }
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

                <DrawerLayout
                    drawerWidth={300}
                    ref={drawerElement => {
                        this.DRAWER = drawerElement;
                    }}
                    drawerPosition={DrawerLayout.positions.left}
                    onDrawerOpen={this.setDrawerState}
                    onDrawerClose={this.setDrawerState}
                    renderNavigationView={() => <Menu />}
                   
                >
                    <ActionBar
                        title={"TINE"}
                        containerStyle={styles.bar}
                        backgroundColor="#3D3D3D"
                        leftIconName={'menu'}
                        onLeftPress={this.toggleDrawer}
                        disableShadows={true}
                         />
                    <View style={styles.container}>
                        <Text style={styles.titulo} >Lista de Empresas</Text>
                        {this.parseData()}
                    </View>
                </DrawerLayout>
                
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