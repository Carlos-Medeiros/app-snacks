import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator, Animated,Keyboard, LogBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [menssage, setMenssage] = useState('');
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [logo] = useState(new Animated.ValueXY({x: widthToDP('100%'), y: heightToDP('30%')}));

    const handleLogin = () => {
        setLoading(false);
        API.post(`/login`, {
            email: email,
            password: password
        }).then(setMenssage(''))
        .then(setLoading(true))
        .then(home)
        .catch(handleLoginDeliveryman)
    };

    const handleLoginDeliveryman = () => {
        setLoading(false);
        API.post(`/login/deliveryman`, {
            email: email,
            password: password
        }).then(setMenssage(''))
        .then(deliverymanStatus)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setLoading(true)
        setMenssage('Email ou senha invalidos');
    }

    const home = () => {
        navigation.replace('Home', {userEmail: email})
    }

    const deliverymanStatus = () => {
        navigation.replace('DeliverymanStatus', {userEmail: email})
    }

    const choice = () => {
        setMenssage('')
        navigation.navigate('Choice', {userEmail: email})
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
    
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: useNativeDriver']);
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    
    }, [])


    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(logo.y, {
                toValue: heightToDP('36%'),
                duration: 100,
            })
        ]).start();
    }
    function keyboardDidHide(){
        Animated.parallel([
            Animated.timing(logo.y, {
                toValue: heightToDP('30%'),
                duration: 100,
            })
        ]).start();
    }

    return ( 
        <>
            <View style={styles.container}>
                <Animated.View style={{height: logo.y, width: logo.x, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Image source={require(`../img/Logo.png`)} style={styles.logo}/>
                </Animated.View>
                <View style={styles.loadingSpinner}>
                    {loading ? home : <ActivityIndicator size="large" color="#DB1020"/>}
                </View>
                <View style={styles.containerEmail}>
                    <TextInput style={styles.InputEmail} placeholder="Email" onChangeText={text=>setEmail(text)} autoCapitalize="none"/>
                    <Image source={require('../img/Message.png')} style={styles.iconMessage} ></Image>
                </View>
                <Text style={styles.textMenssage}>{menssage}</Text>
                <View style={styles.containerPassword}>
                    <TextInput secureTextEntry={visible} style={styles.InputPassword} placeholder="Senha" onChangeText={text=>setPassword(text)} autoCapitalize="none"/>
                    <Image source={require('../img/Lock.png')} style={styles.iconLock} ></Image>
                    <View style={styles.containerVisiblePassword}>
                        <TouchableOpacity style={styles.visiblePassword} onPress={()=>visiblePassword()}>
                            <View style={styles.containerVisible}>
                                {visible ? <Image source={require(`../img/Visible.png`)}/> : <Image source={require('../img/Invisible.png')} style={styles.invisible}/>}
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
                        <TouchableOpacity style={styles.buttonCadastrese} onPress={()=>choice()}>
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
        backgroundColor: 'white',
        justifyContent: 'center',
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
        backgroundColor: '#F6F6F6',
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
        color: '#DB1020',
        marginLeft: widthToDP('7%'),
        marginTop: widthToDP('4%')
    },
    containerPassword: {
        marginTop: widthToDP('8%')
    },
    InputPassword: {
        backgroundColor: '#F6F6F6',
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
        color: '#848484'
    },
    textEntrar: {
        textAlign: 'center',
        color: '#DB1020',
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
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
    },
    containerCadastrese: {
        marginTop: heightToDP('3%')
    },
    textCadastrese: {
        color: '#DB1020',
        fontSize: 18
    }, 
});
