import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';

export default function HomeDeliveryman({ route, navigation }) {

    const [email, setEmail] = useState('');

    const login = () => {
        AsyncStorage.setItem('EmailUser', ''),
        AsyncStorage.setItem('PasswordUser', ''),
        navigation.replace('Login')
    }

    const requests = () => {
        navigation.navigate('RequestsDeliveryman')
    }

    const editAccount = () => {
        navigation.navigate('EditAccount', {userEmail: email})
    }

    useEffect(() => {
        if (email === '') {
            AsyncStorage.getItem('EmailUser')
            .then((email) => {
                setEmail(email)
            })
        }

        function handleBackButton() {
          navigation.navigate('HomeDeliveryman');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.logo}>Delivery da Gé</Text>
                </View>
                <View>
                    <Image source={require('../img/home_yellow.png')} style={styles.imgStatus} ></Image>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textStatus}>
                        Acompanhe os pedidos e entregue no prazo!
                    </Text>
                    <Text style={styles.textInfo}>
                        Pilote com segurança, sua vida em primeiro lugar.
                    </Text>
                </View>
                <View style={styles.containerButtonPedidos}>
                    <TouchableOpacity style={styles.buttonPedidos} onPress={()=>requests()}>
                        <Text style={styles.textButtonPedidos}>Ver Pedidos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButtonConta}>
                    <TouchableOpacity style={styles.buttonConta} onPress={()=>editAccount()}>
                        <Text style={styles.textButtonConta}>Editar conta</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>login()}>
                        <Text style={styles.textButton}>Sair</Text>
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
    imgStatus: {
        marginTop: heightToDP('4%'),
        width: 315,
        height: 210
    },
    containerText: {
        width: widthToDP('77%'),
        marginTop: heightToDP('3%')
     },
    textStatus: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    textInfo: {
        marginTop: heightToDP('1%'),
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    containerButtonPedidos: {
        marginTop: heightToDP('3%'),
    },
    buttonPedidos: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFDD00',
        width: widthToDP('50%'),
        height: widthToDP('13%'),
        borderRadius: 15,
    },
    textButtonPedidos: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerButtonConta: {
        marginTop: heightToDP('3%'),
    },
    buttonConta: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthToDP('50%'),
        height: widthToDP('13%'),
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFDD00'
    },
    textButtonConta: {
        color: '#FFDD00',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerButton: {
        marginTop: heightToDP('3%'),
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#FFDD00',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
