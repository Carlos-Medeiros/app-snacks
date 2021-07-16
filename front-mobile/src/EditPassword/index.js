import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function EditPassword({route, navigation }) {
    
    const [email, setEmail] = useState(route.params.userEmail);
    const [deliveryman, setDeliveryman] = useState([]);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [menssage, setMenssage] = useState('');
    const [visible, setVisible] = useState(true);
    const [visibleRepeat, setVisibleRepeat] = useState(true);

    useEffect(() => {
        function handleBackButton() {
          navigation.replace('EditAccount', {userEmail: email});
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        API.get(`/${email}/status`, {
        }).then((response) => {setDeliveryman(response.data)})
    }, []);

    const completeRegister = () => {
        if (password && repeatPassword != '') {
            if (password == repeatPassword) {
                setMenssage('')
                API.put(`/editPassword/deliveryman/${email}`, {
                    password: password
                }).then(AsyncStorage.setItem('PasswordUser', password),
                    navigation.replace('EditAccount', {userEmail: email}))
                .catch()
            }
            else {
                setMenssage('Senhas não coincidem');
            }
        }
        else {
            setMenssage('A senha deve conter no mínino 8 caracteres')
        }
    }
    const editAccount = () => {
        navigation.replace('EditAccount', {userEmail: email})
    }

    const home = () => {
        navigation.replace('HomeDeliveryman')
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
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={home}>
                        <Text style={styles.logo}>Delivery da Gé</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textStatus}>
                        Editar senha
                    </Text>
                </View>
                <TextInput secureTextEntry={visible} style={styles.inputPassword} placeholder="Insira sua senha" placeholderTextColor="#707070" onChangeText={text=>setPassword(text)} autoCapitalize="none"/>
                    <Image source={require('../img/lock_yellow.png')} style={styles.iconLock} ></Image>
                        <View style={styles.containerVisiblePassword}>
                            <TouchableOpacity style={styles.visiblePassword} onPress={()=>visiblePassword()}>
                                <View style={styles.containerVisible}>
                                    {visible ? <Image source={require(`../img/visible_icon.png`)}/> : <Image source={require('../img/invisible_icon.png')} style={styles.invisible}/>}
                                </View>
                            </TouchableOpacity>
                        </View>
                <TextInput secureTextEntry={visibleRepeat} style={styles.inputRepeatPassword} placeholder="Repita sua senha" placeholderTextColor="#707070" onChangeText={text=>setRepeatPassword(text)} autoCapitalize="none"/>
                <Image source={require('../img/lock_yellow.png')} style={styles.iconLockRepeat} ></Image>
                    <View style={styles.containerVisiblePasswordRepeat}>
                        <TouchableOpacity style={styles.visiblePasswordRepeat} onPress={()=>visiblePasswordRepeat()}>
                            <View style={styles.containerVisibleRepeat}>
                                {visibleRepeat ? <Image source={require(`../img/visible_icon.png`)}/> : <Image source={require('../img/invisible_icon.png')} style={styles.invisible}/>}
                            </View>
                        </TouchableOpacity>
                    </View>
                <View style={styles.containerErro}>
                    <Text style={styles.textError}>{menssage}</Text>
                </View>
                
                <View style={styles.containerButtonSave}>
                    <TouchableOpacity style={styles.buttonSave} onPress={()=>completeRegister()}>
                        <Text style={styles.textButtonSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={()=>editAccount()}>
                            <Text style={styles.textButton}>Cancelar</Text>
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
        alignItems: 'center'
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: heightToDP('11%'),
        backgroundColor: '#FFDD00',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: heightToDP('3%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121315'
    },
    containerText: {
        width: widthToDP('88%'),
        marginTop: heightToDP('2%'),
        alignItems: 'flex-start'
     },
    textStatus: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFDD00',
        textAlign: 'center'
    },
    containerInput: {
        flexDirection: 'row'
    },
    inputPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#2C2D34',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('4%'),
        color: '#FFDD00'
    },
    iconLock: {
        marginLeft: widthToDP('-75%'),
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
        width: 40,
        height: 40,
    },
    invisible: {
        marginTop: widthToDP('-0.5%')
    },
    inputRepeatPassword: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#2C2D34',
        borderRadius: 15,
        paddingLeft: 50,
        marginTop: heightToDP('4%'),
        color: '#FFDD00'
    },
    iconLockRepeat: {
        marginLeft: widthToDP('-75%'),
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
        width: 40,
        height: 40,
    },
    invisible: {
        marginTop: widthToDP('-0.5%')
    },
    containerErro: {
        width: widthToDP('100%'),
        marginTop: heightToDP('1%'),
    },  
    textError: {
        color: '#FFDD00',
        marginLeft: widthToDP('6%')
    },
    containerButtonSave: {
        marginTop: heightToDP('40%')
    },
    buttonSave: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFDD00',
        width: widthToDP('50%'),
        height: widthToDP('15%'),
        borderRadius: 15,
    },
    textButtonSave: {
        color: '#FFDD00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerButton: {
        marginTop: heightToDP('3%')
    },
    textButton: {
        color: '#FFDD00',
        fontSize: 18
    }, 
});
