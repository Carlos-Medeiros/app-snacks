import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function EditPhone({ navigation }) {
    
    const [deliveryman, setDeliveryman] = useState([]);

    useEffect(() => {
        API.get(`/email@gmail.com/status`, {
        }).then((response) => {setDeliveryman(response.data)})
    }, []);

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }

    const editName = () => {
        navigation.navigate('')
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
                <TouchableOpacity style={styles.containerItem}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>{deliveryman.name}</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/red_arrow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>Nome</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.containerItem}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>{deliveryman.phones}</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/red_arrow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>Telefone</Text>
                </TouchableOpacity>   

                <TouchableOpacity style={styles.containerItem}>
                    <View style={styles.headerItem}>
                        <Text style={styles.userName}>********</Text>
                        <View>
                            <View style={styles.containerArrow}>
                                <Image source={require('../img/red_arrow.png')} style={styles.arrow} ></Image>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.itemName}>Senha</Text>
                </TouchableOpacity>          
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: heightToDP('11%'),
        backgroundColor: '#DB1020',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: heightToDP('3%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    containerText: {
        width: widthToDP('100%'),
        marginTop: heightToDP('2%'),
        alignItems: 'center'
     },
    textStatus: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    containerButton: {
        marginTop: heightToDP('3%'),
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#DB1020',
        fontSize: 16,
        fontWeight: 'bold'
    },
    containerItem: {
        marginTop: heightToDP('2%'),
        marginBottom: heightToDP('2%'),
        marginRight: widthToDP('5%'),
        marginLeft: widthToDP('5%'),
        width: widthToDP('90%'),
        padding: 15,
        backgroundColor: '#ffffff',
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
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#9E9E9E',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#263238',
    },
    arrow: {
        width: 20,
        height: 20
    },
    containerArrow: {
        marginTop: heightToDP('1.5%'),
        textAlign: 'right',
        color: '#DB1020'    
    }
});
