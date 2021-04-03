import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { RectButton, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Choice({ route, navigation }) {


    const login = () => {
        navigation.navigate('Login')
    }

    const register = () => {
        navigation.navigate('Register')
    }

    const registerDeliveryman = () => {
        navigation.navigate('RegisterDeliveryman')
    }


    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>login()}>
                    <Image source={require('../img/arrow1x.png')} ></Image>
                </TouchableWithoutFeedback>
                <Text style={styles.textRegister}>Register</Text>
            </View>
            <View style={styles.containerBarras}>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.textH1}>Hello, welcome to Snack! :)</Text>
                <Text style={styles.textH2}>Are you a delivery man or customer?</Text>
                
                <View style={styles.containerButtonClient}>
                    <TouchableOpacity style={styles.buttonClient} onPress={()=>register()} >
                        <Text style={styles.textButton}>Fazer Pedido</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButtonDeliveryman}>
                    <TouchableOpacity style={styles.buttonDeliveryman} onPress={()=>registerDeliveryman()} >
                        <Text style={styles.textButton}>Entregar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        height: 116,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgSeta: {
        marginLeft: 13
    },
    textRegister: {
        fontSize: 16,
        marginLeft: '33%'
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra: {
        backgroundColor: '#F6F6F6',
        width: 70,
        height: 4,
        borderRadius: 5,
        marginLeft: '6.4%'
    },
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    textH1: {
        marginTop: 55,
        marginLeft: '6.4%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: 6,
        marginLeft: '6.4%',
        fontSize: 16,
    },
    Input: {
        width: 350,
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 10,
        marginTop: 55,
        marginLeft: '6.4%'
    },
    containerButtonClient: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 124,
    },
    buttonClient: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
        width: 350,
        height: 60,
        borderRadius: 15,
    },
    containerButtonDeliveryman: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    buttonDeliveryman:{
        width: 350,
        height: 60,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
        borderRadius: 15,
    },
    textButton: {
        textAlign: 'center',
        marginTop: 12,
        color: '#DB1020',
        fontSize: 18
    }
});
