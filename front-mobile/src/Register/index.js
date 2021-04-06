import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import API from '../api';

export default function Register({ route, navigation }) {

    const [email, setEmail] = useState('');
    const [menssage, setMenssage] = useState('');
    const [menssageRoute, setMenssageRoute] = useState('');
    const [deliverymanCod, setDeliverymanCod] = useState(route.params.deliverymanCod);
    
    const emailValidation = () => {
        API.post(`/emailValidator`, {
            email: email,
        }).then(setMenssage(''))
        .then(setMenssageRoute(''))
        .then(codeValidation)
        .catch(emailValidationPut)
    };

    const emailValidationPut = () => {
        API.put(`/emailValidator/${email}`, {
        }).then(setMenssage(''))
        .then(setMenssageRoute(''))
        .then(codeValidation)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setMenssage('Este e-mail já está cadastrado, ')
        setMenssageRoute('quer logar?')
    }

    const codeValidation = () => {
        setMenssage('')
        setMenssageRoute('')
        navigation.navigate('CodeValidation', {userEmail: email});
    }

    const choice = () => {
        setMenssage('')
        setMenssageRoute('')
        navigation.navigate('Choice')
    }

    const login = () => {
        setMenssage('')
        setMenssageRoute('')
        navigation.navigate('Login')
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>choice()}>
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

                <Text style={styles.textH1}>Hello, welcome to Snack! :) </Text>
                <Text style={styles.textH2}>Enter your email</Text>
                <TextInput style={styles.Input} placeholder="Seu email..." onChangeText={text=>setEmail(text)} autoCapitalize="none"/>

               <View style={styles.containerError}>
                    <Text style={styles.textVisible}>{menssage}</Text>
                    <TouchableOpacity style={styles.buttonVisible} onPress={()=>login()}>
                        <Text style={styles.textRoute}>{menssageRoute}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>emailValidation()}>
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
        marginTop: '66%'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB1020',
        width: '88%',
        height: 60,
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
