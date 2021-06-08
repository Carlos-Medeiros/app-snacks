import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive'
import API from '../api';

export default function ForgotPasswordHome({navigation}) {

    const [email, setEmail] = useState('');
    const [menssage, setMenssage] = useState('');
    const [loading, setLoading] = useState(true);

    const emailValidationPut = () => {
        setLoading(false);
        API.put(`/emailValidator/${email}/1`, {
        }).then(setMenssage(''))
        .then(codeValidation)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setLoading(true);
        setMenssage('Este e-mail não esta cadastrado')
    }

    const codeValidation = () => {
        setLoading(true);
        setMenssage('')
        navigation.navigate('ForgotPasswordCode', {userEmail: email});
    }

    const login = () => {
        setMenssage('')
        navigation.navigate('Login')
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerSeta}>
                        <TouchableOpacity style={styles.imgSeta} onPress={()=>login()}>
                            <Image source={require('../img/arrow1x.png')} ></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Recuperação</Text>
                </View>
                <View style={styles.containerBarras}>
                    <Text style={styles.textBarra1}></Text>
                    <Text style={styles.textBarra2}></Text>
                    <Text style={styles.textBarra3}></Text>
                </View>

                <Text style={styles.textH1}>Olá, bem-vindo ao Lanches da Gê!</Text>
                <Text style={styles.textH2}>Digite seu e-mail</Text>
                <View style={styles.loadingSpinner}>
                    {loading ? codeValidation : <ActivityIndicator size="large" color="#DB1020"/>}
                </View>
                <TextInput style={styles.Input} placeholder="Email" onChangeText={text=>setEmail(text)} autoCapitalize="none"/>
                <Image source={require('../img/Message.png')} style={styles.iconMessage} ></Image>

                <View style={styles.containerError}>
                    <Text style={styles.textVisible}>{menssage}</Text>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>emailValidationPut()}>
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
        marginLeft: widthToDP('25.5%'),
        marginTop: heightToDP('2%')
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#DB1020',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#F6F6F6',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#F6F6F6',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: heightToDP('8%'),
        marginLeft: widthToDP('6%'),
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%'),
        fontSize: 16
    },
    loadingSpinner: {
        marginTop: heightToDP('2%'),
        width: widthToDP('100%'),
        height: widthToDP('10%')
    },
    Input: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('1%'),
        marginLeft: widthToDP('6%')
    },
    iconMessage: {
        marginLeft: widthToDP('11%'),
        marginTop: widthToDP('-8.5%')
    },  
    containerButton: {
        marginTop: heightToDP('37%')
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
    containerError: {
        flexDirection: 'row',
        marginTop: heightToDP('3%')
    },
    textVisible: {
        color: '#DB1020',
        marginLeft: widthToDP('6%')
    }
});