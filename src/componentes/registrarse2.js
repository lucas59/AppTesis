import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, TextInput, AsyncStorage } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
const { server } = require('../config/keys');


export default class Signup2 extends React.Component {


    constructor(props) {
        super(props);

    }
    state = {
        image: null,
        documento: null,
        nombre: null,
        apellido: null,
        celular: null,
        nacimiento: null,
    };
    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ image: uri });
    };

    showDateTimePicker_inicio = () => {
        this.setState({ isDateTimePickerVisible_inicio: true });
    };

    hideDateTimePicker_inicio = () => {
        this.setState({ isDateTimePickerVisible_inicio: false });
    };

    handleDatePicked_inicio = pickeddate => {
        this.setState({ nacimiento: pickeddate })
        // const value = await AsyncStorage.getItem('usuario')
        this.hideDateTimePicker_inicio();
    };

    enviarDatosEmpleado = async () => {

        const { navigation } = this.props;
        const datos = JSON.parse(navigation.getParam('datos'));

        const { nombre, apellido, celular, nacimiento, image } = this.state;

        let usuario = await AsyncStorage.getItem('usuario');
        let ld = JSON.parse(usuario);

        if (nombre == "" || celular == "" || apellido == "" || nacimiento == null) {
            ToastAndroid.show('Ingresa datos validos.', ToastAndroid.SHORT);
            return;
        }

        var formData = new FormData();
        formData.append('email', datos.email);
        formData.append('password', datos.password);
        formData.append('fullName', datos.fullName);
        formData.append('tipo', datos.tipo);
        formData.append('documento', datos.documento);
        formData.append('nombre', nombre);
        formData.append('celular', celular);
        formData.append('apellido', apellido);
        formData.append('nacimiento', nacimiento);
        formData.append('image', image);

        let datosFinales = {
            email: datos.email,
            password: datos.password,
            fullName: datos.fullName,
            tipo: datos.tipo,
            documento: datos.documento,
            nombre: nombre,
            apellido,
            celular,
            nacimiento,
            image
        }
        console.log('finales',datosFinales);


        await fetch(server.api + 'signup2', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosFinales)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const retorno = data;
                console.log('retorno', retorno);
                if (retorno.retorno == true) {
                    //ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
                    AsyncStorage.setItem('usuario', JSON.stringify(datos));
                    this.props.navigation.navigate('Inicio');
                } else {
                    alert(retorno.mensaje);
                }
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }



    enviarDatosEmpresa = async () => {

        const { navigation } = this.props;
        const datos = JSON.parse(navigation.getParam('datos'));

        const { nombre } = this.state;

        let usuario = await AsyncStorage.getItem('usuario');
        let ld = JSON.parse(usuario);

        if (nombre == "") {
            ToastAndroid.show('Ingresa datos validos.', ToastAndroid.SHORT);
            return;
        }

        var formData = new FormData();
        formData.append('email', datos.email);
        formData.append('password', datos.password);
        formData.append('fullName', datos.fullName);
        formData.append('tipo', datos.tipo);
        formData.append('nombre', nombre);


        let datosFinales = {
            email: datos.email,
            password: datos.password,
            fullName: datos.fullName,
            tipo: datos.tipo,
            nombre: nombre,
            documento: datos.documento

        }

        console.log('datosFinales', datosFinales);

        await fetch(server.api + 'signup2Empresa', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
            body: { datos: JSON.stringify(datosFinales) }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const retorno = data;
                console.log('retorno', retorno);
                if (retorno.retorno == true) {
                    //ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
                    AsyncStorage.setItem('usuario', JSON.stringify(datos));
                    this.props.navigation.navigate('modoTablet');
                } else {
                    alert(retorno.mensaje);
                }
            })
            .catch(function (err) {
                console.log('error', err);
            })
    }


    render() {
        const { navigation } = this.props;
        const datos = JSON.parse(navigation.getParam('datos'));
        if (datos.tipo == 1) {
            return (
                <View style={styles.container}>
                    <Text>Bienvenido</Text>
                    <Image style={styles.image} source={{ uri: this.state.image }} />
                    <View style={styles.row}>
                        <Button onPress={this.selectPicture}><Ionicons name="md-camera" size={32} />Gallery</Button>
                        <Button onPress={this.takePicture}><Ionicons name="md-photos" size={32} />Camera</Button>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Nombre"
                            underlineColorAndroid='transparent'
                            onChangeText={(nombre) => this.setState({ nombre })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Apellido"
                            underlineColorAndroid='transparent'
                            onChangeText={(apellido) => this.setState({ apellido })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Celular"
                            underlineColorAndroid='transparent'
                            onChangeText={(celular) => this.setState({ celular })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Documento"
                            underlineColorAndroid='transparent'
                            onChangeText={(documento) => this.setState({ documento })} />
                    </View>
                    <Button title="Fecha de nacimiento" onPress={this.showDateTimePicker_inicio}>Fecha de nacimiento</Button>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible_inicio}
                        onConfirm={this.handleDatePicked_inicio}
                        onCancel={this.hideDateTimePicker_inicio}
                        mode={'date'}
                    />
                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.enviarDatosEmpleado}>
                        <Text onPress={this.enviarDatosEmpleado} style={styles.signUpText}>Listo</Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Button onPress={this.selectPicture}><Ionicons name="md-camera" size={32} />Gallery</Button>
                        <Button onPress={this.takePicture}><Ionicons name="md-photos" size={32} />Camera</Button>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Nombre"
                            underlineColorAndroid='transparent'
                            onChangeText={(nombre) => this.setState({ nombre })} />
                    </View>
                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.enviarDatosEmpresa}>
                        <Text onPress={this.enviarDatosEmpresa} style={styles.signUpText}>Listo</Text>
                    </TouchableHighlight>
                </View>
            );

        }
    }
}

const Button = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 21,
    },
    row: { flexDirection: 'row' },
    image: { width: 80, height: 80 },
    button: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    inputContainer: {
        borderBottomColor: '#8594A6',
        backgroundColor: '#FFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#8594A6',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#034358",
    },
    signUpText: {
        color: 'white',
    }
});

