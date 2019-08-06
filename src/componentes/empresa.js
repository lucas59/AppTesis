import React, { Component } from 'react';
import { View } from 'react-native';
const { server } = require('../config/keys');
import LandscapeView from 'react-native-landscape-view';
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
              <LandscapeView>
            <WebView source={{
                uri:'https://google.com'
                }} />
        </LandscapeView>
            </>
        )
    }
}
