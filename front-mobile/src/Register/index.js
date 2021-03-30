import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

import API from '../api';
import Header from '../Header/header';

export default function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [numberValidation, setNumberValidation] = useState([]);

    const [menssage, setMenssage] = useState('');

    const handlePost = () => {
        API.post(`/emailValidator`, {
            email: email,
        }).then( ({data}) => console.log(data) )
        .then(handleGet)
        .catch(setMenssage('Este e-mail já está cadastrado, quer logar?'))
    };

    const handleGet = () => {
        API.get(`/emailValidator/${email}`, {
        }).then((response) => {setNumberValidation(response.data)
        }).then(codeValidation)
    }

    const codeValidation = () => {
        navigation.navigate('CodeValidation', {userEmail: email, userNumberValidator: numberValidation.numberValidation});
    }

    const login = () => {
        navigation.navigate('Login')
    }

    return ( 
        <>
            <Header/>
            <View style={styles.containerBarras}>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textBarra}></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.textH1}>Hello, welcome to Snack! :) </Text>
                <Text style={styles.textH2}>Enter your email</Text>
                <TextInput style={styles.Input} placeholder="Seu email..." onChangeText={text=>setEmail(text)}/>
                <Text>{menssage}</Text>

               {/*<View style={styles.containerError}>
                    <Text style={styles.textVisible}>Este e-mail já está cadastrado, </Text>
                    <TouchableOpacity style={styles.buttonVisible} onPress={() => login()}>
                        <Text style={styles.textRoute}>quer logar?</Text>
                    </TouchableOpacity>
    </View>*/}

                <RectButton style={styles.button} onPress={()=>handlePost()}>
                    <Text style={styles.textButton}>Prosseguir</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB1020',
        width: 350,
        height: 60,
        borderRadius: 15,
        marginLeft: '7%',
        marginTop: '65%'
    },
    textButton: {
        color: 'white',
        fontSize: 18
    },
    containerError: {
        flexDirection: 'row'
    },
    buttonVisible: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    textVisible: {
        color: 'black',
        marginTop: 10,
        marginLeft: '7%'
    },
    textRoute: {
        textDecorationLine: 'underline',
        color: '#DB1020'
    }
});
