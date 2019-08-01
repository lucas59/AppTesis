import React, { Component } from 'react';
import { View } from 'react-native';
const { server } = require('../config/keys');
export default class modoTablet extends Component {

    static navigationOptions = {
        title: 'ModoTablet',
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (

            <>
                <View>
                 
                </View>
            </>
        )
    }
}
