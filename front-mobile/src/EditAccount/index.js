import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthToDP, heightToDP} from '../Responsive';
import { useIsFocused } from '@react-navigation/native';
import API from '../api';
import userService from '../Service/UserService';

export default function EditAccount({ route, navigation }) {
    
    const [deliveryman, setDeliveryman] = useState([]);
    const isFocused = useIsFocused();
    const [email, setEmail] = useState(route.params.userEmail);

    const fetchData = () => {
        userService.userDetails()
        .then((response) => {
            setDeliveryman(response.data),
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('HomeDeliveryman');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    },[isFocused]);

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }

    const editName = () => {
        navigation.navigate('EditName', {userEmail: email})
    }

    const editPhone = () => {
        navigation.navigate('EditPhone', {userEmail: email})
    }

    const editPassword = () => {
        navigation.navigate('EditPassword', {userEmail: email})
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
                        Dados pessoais
                    </Text>
                </View>
                <TouchableOpacity style={styles.containerItem} onPress={editName}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>Nome</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/arrow2_yellow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>{deliveryman.name}</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.containerItem} onPress={editPhone}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>Telefone</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/arrow2_yellow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>{deliveryman.phones}</Text>
                </TouchableOpacity>   

                <TouchableOpacity style={styles.containerItem} onPress={editPassword}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>Senha</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/arrow2_yellow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>********</Text>
                </TouchableOpacity>          
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
        color: '#121315'
    },
    containerText: {
        width: widthToDP('100%'),
        marginTop: heightToDP('2%'),
        alignItems: 'center'
     },
    textStatus: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFDD00',
        textAlign: 'center'
    },
    containerItem: {
        marginTop: heightToDP('2%'),
        marginBottom: heightToDP('2%'),
        marginRight: widthToDP('5%'),
        marginLeft: widthToDP('5%'),
        width: widthToDP('90%'),
        padding: 15,
        backgroundColor: '#121315',
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        elevation: 9

    },
    headerItem: {
        width: widthToDP('82.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        marginTop: heightToDP('-1%'),
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#FFDD00',
    },
    userName: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#FFDD00',
    },
    arrow: {
        width: 20,
        height: 20
    },
    containerArrow: {
        marginTop: heightToDP('1.5%'),
        textAlign: 'right',
    }
});
