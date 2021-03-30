import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import API, { register } from '../api';
import Header from '../Header/header';

export default function CodeValidation({ route, navigation }) {

    const [numberValidation, setNumberValidation] = useState([]);

    const [keyValidation, setKeyValidation] = useState(route.params.userNumberValidator);

    const handlePut = () => {
        API.put(`/emailValidator/${route.params.userEmail}`, {
        }).then( ({data}) => console.log(data) )
        .then(handleGet)
    };

    const handleGet = () => {
        API.get(`/emailValidator/${route.params.userEmail}`).then((response) => {
            setNumberValidation(response.data);
        })
    };

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

                <Text style={styles.textH1}>Hello, welcome to Snack! {route.params.userNumberValidator}:)</Text>
                <Text style={styles.textH2}>Enter your email</Text>
                <TextInput style={styles.Input} placeholder="Seu email..."/>

                <RectButton style={styles.button} onPress={()=>handlePut()} >
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
        backgroundColor: 'green',
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
        marginTop: '75%'
    },
    textButton: {
        color: 'white',
        fontSize: 18
    }
});
