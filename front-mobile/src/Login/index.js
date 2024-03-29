import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from '../Service/UserService';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [menssage, setMenssage] = useState('');
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleLogin = () => {

        let data = {
            email: email,
            password: password
        }
        setLoading(false);

        userService.login(data)
        .then(() => {
            setMenssage(''),
            deliverymanStatus();
        }).catch(() => {
            errorRegister();
        })
    };

    const errorRegister = () => {
        setLoading(true)
        setMenssage('Email ou senha invalidos');
    }

    const deliverymanStatus = () => {
        AsyncStorage.setItem('EmailUser', email),
        AsyncStorage.setItem('PasswordUser', password),
        navigation.replace('DeliverymanStatus', {userEmail: email})
    }

    const register = () => {
        setMenssage('')
        navigation.navigate('Register');
    }

    const forgotPasswordHome = () => {
        setMenssage('')
        navigation.navigate('ForgotPasswordHome')
    }

    function visiblePassword(){
        if (visible == true) {
            setVisible(false)
        }
        else {
            setVisible(true)
        }
    }
    
    return ( 
        <>
            <View style={styles.container}>
                <View  style={styles.logo}>
                    <Text style={styles.logoH1}>
                        COMEDORIA DA GÊ
                    </Text>
                    <View style={styles.logoBarra}></View>
                    <Text style={styles.logoH2}>
                        delivery
                    </Text>
                </View>
                <View style={styles.loadingSpinner}>
                    {loading ? deliverymanStatus : <ActivityIndicator size="large" color="#FFDD00"/>}
                </View>
                <View style={styles.containerEmail}>
                    <TextInput style={styles.InputEmail} placeholder="Email" placeholderTextColor="#707070" onChangeText={text=>setEmail(text)} autoCapitalize="none"/>
                    <Image source={require('../img/message_yellow.png')} style={styles.iconMessage} ></Image>
                </View>
                <Text style={styles.textMenssage}>{menssage}</Text>
                <View style={styles.containerPassword}>
                    <TextInput secureTextEntry={visible} style={styles.InputPassword} placeholder="Senha" placeholderTextColor="#707070" onChangeText={text=>setPassword(text)} autoCapitalize="none"/>
                    <Image source={require('../img/lock_yellow.png')} style={styles.iconLock} ></Image>
                    <View style={styles.containerVisiblePassword}>
                        <TouchableOpacity style={styles.visiblePassword} onPress={()=>visiblePassword()}>
                            <View style={styles.containerVisible}>
                                {visible ? <Image source={require(`../img/visible_icon.png`)}/> : <Image source={require('../img/invisible_icon.png')} style={styles.invisible}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.containerButton}>

                    <View style={styles.containerButtonOpacity}>
                        <TouchableOpacity style={styles.buttonOPacity} onPress={()=>forgotPasswordHome()}>
                            <Text style={styles.textOpacity}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                    

                    <View style={styles.containerEntrar}>
                        <TouchableOpacity style={styles.buttonEntrar} onPress={()=>handleLogin()}>
                            <Text style={styles.textEntrar}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.containerCadastrese}>
                        <TouchableOpacity style={styles.buttonCadastrese} onPress={()=>register()}>
                            <Text style={styles.textCadastrese}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#121315',
        justifyContent: 'center',
    },
    logo: {
        width: widthToDP('100%'),
        height: heightToDP('30%'),
        marginTop: heightToDP('4%'),
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logoH1: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFDD00'
    },
    logoBarra: {
        width: widthToDP('100%'),
        height: 3,
        backgroundColor: '#FFDD00'
    }, 
    logoH2: {
        marginTop: heightToDP('-0.5%'),
        fontSize: 32,
        color: '#FFDD00'
    },
    loadingSpinner: {
        marginTop: 15,
        width: widthToDP('100%'),
        height: heightToDP('5%')
    },
    containerEmail: {
        marginTop: heightToDP('2%')
    },
    InputEmail: {
        backgroundColor: '#191A1D',
        color: '#FFDD00',
        width: widthToDP('85%'),
        height: widthToDP('13%'),
        borderRadius: 15,
        marginLeft: widthToDP('7%'),
        marginRight: widthToDP('7%'),
        paddingLeft: 45
    },  
    iconMessage: {
        marginLeft: widthToDP('11%'),
        marginTop: widthToDP('-8.5%')
    },  
    textMenssage: {
        color: '#FFDD00',
        marginLeft: widthToDP('7%'),
        marginTop: widthToDP('4%')
    },
    containerPassword: {
        marginTop: widthToDP('8%')
    },
    InputPassword: {
        backgroundColor: '#191A1D',
        color: '#FFDD00',
        width: widthToDP('85%'),
        height: widthToDP('13%'),
        borderRadius: 15,
        marginLeft: widthToDP('7%'),
        marginRight: widthToDP('7%'),
        paddingLeft: 45
    },
    iconLock: {
        marginLeft: widthToDP('11%'),
        marginTop: widthToDP('-9.5%')
    },
    containerVisiblePassword: {
        width: 40,
        height: 40,
        marginLeft: widthToDP('79%'),
        marginTop: -30,
        padding: 2,
        alignItems: 'center',
    },
    visiblePassword: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerVisible: {
        marginTop: widthToDP('6%'),
        marginLeft: widthToDP('4%'),
        width: 40,
        height: 40,
    },
    invisible: {
        marginTop: widthToDP('-0.5%')
    },
    containerButton: {
        alignItems: 'center',
    },
    containerButtonOpacity: {
        marginTop: widthToDP('5%')

    },
    textOpacity: {
        fontSize: 16,
        color: '#FFDD00'
    },
    textEntrar: {
        textAlign: 'center',
        color: '#FFDD00',
        fontSize: 18
    }, 
    containerEntrar: {
        marginTop: heightToDP('5%'),
    },  
    buttonEntrar: {
        justifyContent: 'center',
        height: widthToDP('13%'),
        width: widthToDP('64%'),
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFDD00',
    },
    containerCadastrese: {
        marginTop: heightToDP('3%')
    },
    textCadastrese: {
        color: '#FFDD00',
        fontSize: 18
    }, 
});
