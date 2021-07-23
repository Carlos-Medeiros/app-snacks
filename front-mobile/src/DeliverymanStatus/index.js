import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';

export default function DeliverymanStatus({ route, navigation }) {

    const [deliverymanStatus, setDeliverymanStatus] = useState([]);
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState(route.params.userEmail);

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('DeliverymanStatus');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        API.get(`/${email}/status`, {
        }).then((response) => {setDeliverymanStatus(response.data)})
    }, []);


    useEffect(() => {
        if (deliverymanStatus.status === 'PENDING') {
            setStatus('Pendente')
        }
        if (deliverymanStatus.status === 'ACCEPTED') {
            navigation.replace('HomeDeliveryman')
        }
        if (deliverymanStatus.status === 'REJECTED') {
            setStatus('Rejeitado');
        }
        if (deliverymanStatus.status === 'DISABLED') {
            setStatus('Disativado');
        }
    }, [deliverymanStatus.status]);
        
    const login = () => {
        AsyncStorage.setItem('EmailUser', ''),
        AsyncStorage.setItem('PasswordUser', ''),
        navigation.replace('Login')
    }



    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.logo}>Comedoria da Gé</Text>
                </View>
                <View>
                    <Image source={require('../img/status_yellow.png')} style={styles.imgStatus} ></Image>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textStatus}>
                        Sua conta está com o status: <Text style={styles.status}>{status}</Text>
                    </Text>
                    <Text style={styles.textInfo}>
                        Entre em contato com (81) 98765-4321, para ser reavaliado.
                    </Text>
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
        backgroundColor: '#191A1D',
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
        color: '#2C2D34'
    },
    imgStatus: {
        marginTop: heightToDP('6%'),
        width: 224.72,
        height: 231.64
    },
    containerText: {
        width: widthToDP('77%'),
        marginTop: heightToDP('7%')
     },
    textStatus: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        color: 'white'
    },
    status: {
        color: '#FFDD00',
        marginLeft: widthToDP('27%'),
        fontSize: 26,
        fontWeight: 'bold'
    },
    textInfo: {
        marginTop: heightToDP('1%'),
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    containerButton: {
        marginTop: heightToDP('6%'),
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFDD00',
        width: widthToDP('30%'),
        height: widthToDP('11%'),
        borderRadius: 15,
    },
    textButton: {
        color: '#2C2D34',
        fontSize: 18,
        fontWeight: 'bold',
        fontSize: widthToDP('4.5%')
    }
});
