import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const { server } = require('../config/keys');

export default class Signup extends React.Component {


    static navigationOptions = {
        title: 'Crea una cuenta',
    };



    constructor(props) {
        super(props);
        state = {
            fullName: '',
            email: '',
            password: '',
            tipo:0
        };
    }


    saveData = async () => {
        //Keyboard.dismiss();
        const { email, password, fullName, tipo } = this.state;

        if (email == "" || password == "" || fullName == "") {
            ToastAndroid.show('Ingresa datos validos.', ToastAndroid.SHORT);
            return;
        }

        //save data with asyncstorage
        let datos = {
            email: email,
            password: password,
            fullName: fullName,
            tipo:tipo
        }

        fetch(server.api + 'signup', {
            method: 'POST',
            headers: {
                'Aceptar': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const retorno = data;
                console.log(retorno);
                /*   if (retorno.retorno == true) {
                       alert("Exito");
                       AsyncStorage.setItem('usuario', JSON.stringify(datos));
                       this.props.navigation.navigate('altaTarea');
                   } else {
                       alert(retorno.mensaje);
                   }*/
            })
            .catch(function (err) {
                console.log('error', err);
            })

    }


    render() {
        var radio_props = [
            { label: 'Empresa', value: 0 },
            { label: 'Colaborador', value: 1 }
        ];
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Nombre de usuario"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(fullName) => this.setState({ fullName })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Correo"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>
                <View>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => { this.setState({ tipo: value }) }}
                    />
                </View>
                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.saveData}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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