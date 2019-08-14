import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';


const menuList = require('./Constants.js');

export default class Menu extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#3D3D3D' }}>
                <ScrollView style={styles.container}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Avatar
                            size="large"
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                            showEditButton
                        />
                        <Text style={{color: "#FFFFFF", marginTop: 5}}>Santiago Santos</Text>
                        
                    </View>
                    {menuList.MENU_LIST.map(item => (
                        <TouchableOpacity
                            key={item.index}
                            onPress={() => console.log('entered menu')}
                        >
                            <Text style={{ color: 'white', fontSize: 16, paddingLeft: 20, paddingTop: 16 }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        marginTop: 30,
        marginLeft: 40
    },
    container: {
        marginTop: 48,
    },
    elementsContainer: {
        flex: 1,
        alignContent: "center",
        marginBottom: 24
    }
});