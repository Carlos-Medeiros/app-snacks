import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function ForgotPassword({ route, navigation }) {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [menssage, setMenssage] = useState('');
    const [email, setEmail] = useState(route.params.userEmail);
    const [visible, setVisible] = useState(true);
    const [visibleRepeat, setVisibleRepeat] = useState(true);

    const login = () => {
        navigation.navigate('Login')
    }

    const completeRegister = () => {
        if (password == repeatPassword) {
            API.put(`/forgotYourPassword/${email}`, {
                password: password
            }).then(setMenssage(''))
            .then(completed)
            .catch()
        }
        else {
            setMenssage('Senhas não coincidem');
        }
    }

    const completed = () => {
        navigation.navigate('Login')
    }

    function visiblePassword(){
        if (visible == true) {
            setVisible(false)
        }
        else {
            setVisible(true)
        }
    }
    function visiblePasswordRepeat(){
        if (visibleRepeat == true) {
            setVisibleRepeat(false)
        }
        else {
            setVisibleRepeat(true)
        }
    }

    return ( 
        <>
            <View style={styles.containerHeader}>
                <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>login()}>
                    <Image source={require('../img/arrow1x.png')} ></Image>
                </TouchableWithoutFeedback>
                <Text style={styles.textRegister}>Recuperação</Text>
            </View>            
            <View style={styles.containerBarras}>
                <Text style={styles.textBarra1}></Text>
                <Text style={styles.textBarra2}></Text>
                <Text style={styles.textBarra3}></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.textH1}>E finalmente, crie uma senha!</Text>
                <Text style={styles.textH2}>Digite sua senha</Text>
                <TextInput secureTextEntry={visible} style={styles.inputPassword} placeholder="Insira sua senha" onChangeText={text=>setPassword(text)} autoCapitalize="none"/>
                <Image source={require('../img/Lock.png')} style={styles.iconLock} ></Image>
                    <View style={styles.containerVisiblePassword}>
                        <TouchableOpacity style={styles.visiblePassword} onPress={()=>visiblePassword()}>
                            <View style={styles.containerVisible}>
                                {visible ? <Image source={require(`../img/Visible.png`)}/> : <Image source={require('../img/Invisible.png')} style={styles.invisible}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                <TextInput secureTextEntry={visibleRepeat} style={styles.inputRepeatPassword} placeholder="Repita sua senha" onChangeText={text=>setRepeatPassword(text)} autoCapitalize="none"/>
                <Image source={require('../img/Lock.png')} style={styles.iconLockRepeat} ></Image>
                    <View style={styles.containerVisiblePasswordRepeat}>
                        <TouchableOpacity style={styles.visiblePasswordRepeat} onPress={()=>visiblePasswordRepeat()}>
                            <View style={styles.containerVisibleRepeat}>
                                {visibleRepeat ? <Image source={require(`../img/Visible.png`)}/> : <Image source={require('../img/Invisible.png')} style={styles.invisible}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#DB1020',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#DB1020',
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
        fontSize: 16,
    },
    inputPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6%')
    },
    iconLock: {
        marginLeft: widthToDP('10%'),
        marginTop: widthToDP('-9.5%')
    },
    containerVisiblePassword: {
        width: 40,
        height: 40,
        marginLeft: widthToDP('80%'),
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
    inputRepeatPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6%')
    },
    iconLockRepeat: {
        marginLeft: widthToDP('10%'),
        marginTop: widthToDP('-9.5%')
    },
    containerVisiblePasswordRepeat: {
        width: 40,
        height: 40,
        marginLeft: widthToDP('80%'),
        marginTop: -30,
        padding: 2,
        alignItems: 'center',
    },
    visiblePasswordRepeat: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerVisibleRepeat: {
        marginTop: widthToDP('6%'),
        marginLeft: widthToDP('4%'),
        width: 40,
        height: 40,
    },
    invisible: {
        marginTop: widthToDP('-0.5%')
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
        color: '#DB1020',
        marginTop: heightToDP('1%'),
        marginLeft: widthToDP('6%')
    }
});
