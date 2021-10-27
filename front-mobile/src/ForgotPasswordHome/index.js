import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Image,BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive'
import userService from '../Service/UserService';

export default function ForgotPasswordHome({navigation}) {

    const [email, setEmail] = useState('');
    const [menssage, setMenssage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('Login');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    const emailValidationPut = () => {
        setLoading(false);
        userService.resendCode(email)
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
                            <Image source={require('../img/arrow_yellow.png')} ></Image>
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
                    {loading ? codeValidation : <ActivityIndicator size="large" color="#FFDD00"/>}
                </View>
                <TextInput style={styles.Input} placeholder="Email" placeholderTextColor="#707070" onChangeText={text=>setEmail(text)} autoCapitalize="none"/>
                <Image source={require('../img/message_yellow.png')} style={styles.iconMessage} ></Image>

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
        backgroundColor: '#121315',
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
        marginTop: heightToDP('2%'),
        color: '#FFDD00'
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#FFDD00',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#191A1D',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#191A1D',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: heightToDP('8%'),
        marginLeft: widthToDP('6%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFDD00'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%'),
        fontSize: 16,
        color: '#FFDD00'
    },
    loadingSpinner: {
        marginTop: heightToDP('2%'),
        width: widthToDP('100%'),
        height: widthToDP('10%')
    },
    Input: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#191A1D',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('1%'),
        marginLeft: widthToDP('6%'),
        color: '#FFDD00'
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
        backgroundColor: '#FFDD00',
        width: widthToDP('88%'),
        height: widthToDP('15%'),
        borderRadius: 15,
        marginLeft: widthToDP('6%')
    },
    textButton: {
        color: '#191A1D',
        fontSize: 18
    },
    containerError: {
        flexDirection: 'row',
        marginTop: heightToDP('3%')
    },
    textVisible: {
        color: '#FFDD00',
        marginLeft: widthToDP('6%')
    }
});