import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import API from '../api';

export default function CodeValidation({ route, navigation }) {

    const [menssage, setMenssage] = useState('');
    const [numberKey, setNumberKey] = useState(0);


    const emailValidationPut = () => {
        API.put(`/emailValidator/${route.params.userEmail}`, {
        }).then(setMenssage(''))
    };

    const keyValidation = () => {
        API.post(`/keyValidation`, {
            email: route.params.userEmail,
            numberValidation: numberKey
        }).then(setMenssage(''))
        .then(registerName)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setMenssage('Código invalido')
    }

    const register = () => {
        setMenssage('')
        navigation.navigate('Register')
    }

    const registerName = () => {
        setMenssage('')
        navigation.navigate('RegisterName', {userEmail: route.params.userEmail, deliverymanCod: route.params.deliverymanCod })
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>register()}>
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

                <Text style={styles.textH1}>Enter the code we sent you</Text>
                <Text style={styles.textH2}>Insert the code</Text>
                <TextInput style={styles.input} placeholder="Seu cod..." onChangeText={val=>setNumberKey(val)} autoCapitalize="none"/>

                <View style={styles.containerError}>
                    <Text style={styles.textVisible}>{menssage}</Text>
                </View>

                <View style={styles.containerResendCode}>
                    <TouchableOpacity style={styles.buttonResendCode} onPress={()=>emailValidationPut()}>
                        <Text style={styles.resendCode}>Reenviar código</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>keyValidation()}>
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
    input: {
        width: '88%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: '13%',
        marginLeft: '6%'
    },
    containerButton: {
        marginTop: '48%'
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
        color: '#DB1020',
        marginLeft: '6%'
    },
    textRoute: {
        textDecorationLine: 'underline',
        color: '#DB1020'
    },
    containerResendCode: {
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonResendCode: {
        width: '27%',
    },
    resendCode: {
        color: '#848484'
    }
});
