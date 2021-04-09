import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { TextInputMask } from 'react-native-masked-text';

export default function RegisterPhoneNumber({ route, navigation }) {

    const [phoneNumber, setPhoneNumber] = useState();
    const [menssage, setMenssage] = useState('');

    const registerName = () => {
        navigation.navigate('RegisterName')
    }

    const registerPassword = () => {
        navigation.navigate('RegisterPassword', {userName: route.params.userName, 
        userEmail: route.params.userEmail, deliverymanCod: route.params.deliverymanCod,
        userPhoneNumber: phoneNumber})
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>registerName()}>
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

                <Text style={styles.textH1}>Hello, welcome to Snack! :)</Text>
                <Text style={styles.textH2}>Enter your cell phone number</Text>
                <TextInputMask 
                    style={styles.inputPhoneNumber} 
                    type={'cel-phone'} 
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }} 
                    placeholder="(81) 98765-4321" 
                    value={phoneNumber}
                    onChangeText={val=>setPhoneNumber(val)} 
                />
                <Text style={styles.invisibleBar}></Text>

                <Text style={styles.textError}>{menssage}</Text>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>registerPassword()}>
                        <Text style={styles.textButton}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        height: '16%',
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
        height: '20%',
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra2: {
        backgroundColor: '#DB1020',
        width: '17%',
        height: '20%',
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra3: {
        backgroundColor: '#DB1020',
        width: '17%',
        height: '20%',
        borderRadius: 5,
        marginLeft: '6%'
    },
    textBarra4: {
        backgroundColor: '#F6F6F6',
        width: '17%',
        height: '20%',
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
    inputPhoneNumber: {
        width: '88%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: '25%',
        marginTop: '13%',
        marginLeft: '6%'
    },
    containerButton: {
        marginTop: '60%'
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
    invisibleBar: {
        backgroundColor: '#E2E2E2',
        marginTop: '-10%',
        width: 1,
        height: '4%',
        marginLeft: '26%'
    },
    textError: {
        marginLeft: '6%'
    }
});
