import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function RegisterName({ route, navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const validationComplete = () => {
        navigation.navigate('ValidationComplete')
    }

    const registerPhoneNumber = () => {
        navigation.navigate('RegisterPhoneNumber', {userName: firstName + ' ' + lastName, 
        userEmail: route.params.userEmail, deliverymanCod: route.params.deliverymanCod})
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>validationComplete()}>
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

                <Text style={styles.textH1}>How do you want to be called?</Text>
                <Text style={styles.textH2}>Enter your name</Text>
                <View style={styles.containerInputs}>
                    <TextInput style={styles.inputFirstName} placeholder="Nome" onChangeText={text=>setFirstName(text)} autoCapitalize="none"/>
                    <TextInput style={styles.inputLastName} placeholder="Sobrenome" onChangeText={text=>setLastName(text)} autoCapitalize="none"/>
                </View>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>registerPhoneNumber()}>
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
        backgroundColor: '#DB1020',
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
    containerInputs: {
        flexDirection: 'row'
    },
    inputFirstName: {
        width: '41%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: '13%',
        marginLeft: '6%'
    },
    inputLastName: {
        width: '41%',
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
    }
});
