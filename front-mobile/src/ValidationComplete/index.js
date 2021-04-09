import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ValidationComplete({ route, navigation }) {

    const registerName = () => {
        navigation.navigate('RegisterName')
    }

    const login = () => {
        navigation.navigate('Login')
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
                <Text style={styles.textBarra1}></Text>
                <Text style={styles.textBarra2}></Text>
                <Text style={styles.textBarra3}></Text>
                <Text style={styles.textBarra4}></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.textH1}>SEU EMAIL JA FOI VALIDADO</Text>
                <Text style={styles.textH2}>Aperte Prosseguir para continuar</Text>
                <TextInput style={styles.Input} placeholder="Seu email..." onChangeText={text=>setEmail(text)} autoCapitalize="none"/>

               <View style={styles.containerError}>
                    <Text style={styles.textVisible}>{}</Text>
                    <TouchableOpacity style={styles.buttonVisible} onPress={()=>login()}>
                        <Text style={styles.textRoute}>{}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>registerName()}>
                        <Text style={styles.textButton}>Prosseguir</Text>
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
    textBarra1: {
        backgroundColor: '#DB1020',
        width: '17%',
        height: 4,
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra2: {
        backgroundColor: '#F6F6F6',
        width: '17%',
        height: 4,
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra3: {
        backgroundColor: '#F6F6F6',
        width: '17%',
        height: 4,
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra4: {
        backgroundColor: '#F6F6F6',
        width: '17%',
        height: 4,
        borderRadius: 5,
        marginLeft: '6%'
    },
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    textH1: {
        marginTop: '15%',
        marginLeft: '6%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: '2%',
        marginLeft: '6%',
        fontSize: 16,
    },
    Input: {
        width: '88%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: '13%',
        marginLeft: '6%'
    },
    containerButton: {
        marginTop: '59%'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB1020',
        width: '88%',
        height: '51%',
        borderRadius: 15,
        marginLeft: '6%'
    },
    textButton: {
        color: 'white',
        fontSize: 18
    },
    containerError: {
        flexDirection: 'row',
        marginTop: '2%'
    },
    textVisible: {
        color: 'black',
        marginLeft: '6%'
    },
    textRoute: {
        textDecorationLine: 'underline',
        color: '#DB1020'
    }
});
