import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function RegisterPassword({ route, navigation }) {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [menssage, setMenssage] = useState('');
    const [name, setName] = useState(route.params.userName);
    const [email, setEmail] = useState(route.params.userEmail);
    const [phoneNumber, setPhoneNumber] = useState(route.params.userPhoneNumber);

    const registerPhoneNumber = () => {
        navigation.navigate('RegisterPhoneNumber')
    }

    const completedSuccessfully = () => {
        navigation.navigate('Home')

    }

    const completeRegister = () => {

        API.post(`/register/deliveryman`, {
            name: name,
            email: email,
            password: password,
            phones: phoneNumber
        }).then(setMenssage(''))
        .then(completedSuccessfully)
        .catch(console.log(Error))

        if (route.params.deliverymanCod == 0) {
            if (password == repeatPassword) {
                API.post(`/register`, {
                    name: route.params.userName,
                    email: route.params.userEmail,
                    password: password,
                    phones: route.params.userPhoneNumber
                }).then(setMenssage(''))
                .then(completedSuccessfully)
                .catch(console.log(Error))
            }
            setMenssage('Senhas não coincidem')
        }
        if (route.params.deliverymanCod == 1) {
            if (password == repeatPassword) {
                
            }
            setMenssage('Senhas não coincidem')
        }
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>registerPhoneNumber()}>
                    <Image source={require('../img/arrow1x.png')} ></Image>
                </TouchableWithoutFeedback>
                <Text style={styles.textRegister}>Cadastro</Text>
            </View>            
            <View style={styles.containerBarras}>
                <Text style={styles.textBarra1}></Text>
                <Text style={styles.textBarra2}></Text>
                <Text style={styles.textBarra3}></Text>
                <Text style={styles.textBarra4}></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.textH1}>E finalmente, crie uma senha!</Text>
                <Text style={styles.textH2}>Digite sua senha</Text>
                <TextInput style={styles.inputPassword} placeholder="Insira sua senha" onChangeText={text=>setPassword(text)} autoCapitalize="none"/>
                <TextInput style={styles.inputRepeatPassword} placeholder="Repita sua senha" onChangeText={text=>setRepeatPassword(text)} autoCapitalize="none"/>

                <Text style={styles.textError}>{menssage}</Text>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>completeRegister()}>
                        <Text style={styles.textButton}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: widthToDP('26%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgSeta: {
        width: widthToDP('12%'),
        height: widthToDP('10%'),
        paddingLeft: widthToDP('3%'),
        justifyContent: 'center',
        marginTop: heightToDP('2%')
    },
    textRegister: {
        fontSize: 16,
        marginLeft: widthToDP('28%'),
        marginTop: heightToDP('2%')
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra4: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: widthToDP('15%'),
        marginLeft: widthToDP('6%'),
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%'),
        fontSize: 16,
    },
    inputPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6%')
    },
    inputRepeatPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6%')
    },
    containerButton: {
        marginTop: heightToDP('27%')
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB1020',
        width: widthToDP('88%'),
        height: widthToDP('15%'),
        borderRadius: 15,
        marginLeft: widthToDP('6%')
    },
    textButton: {
        color: 'white',
        fontSize: 18
    },
    textError: {
        marginLeft: widthToDP('6%')
    }
});
