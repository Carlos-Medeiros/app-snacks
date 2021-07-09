import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';

export default function EditName({ navigation }) {

    const [deliveryman, setDeliveryman] = useState([]);
    const [name, setName] = useState('');
    const [menssage, setMenssage] = useState('');

    useEffect(() => {
        API.get(`/email@gmail.com/status`, {
        }).then((response) => {setDeliveryman(response.data)})
        .then(setName(deliveryman.name))
    }, []);

    const editAccount = () => {
        navigation.navigate('EditAccount')
    }

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }

    const save = () => {
        if(name === '') {
            setMenssage('O nome não pode ficar em branco')
        }
        else {
            setMenssage('')
            if(name === deliveryman.name) {
                setMenssage('Insira um nome diferente do atual para alterar')
            }
            else {
                setMenssage('')
                API.post(`/editName/deliveryman/email@gmail.com`, {
                    name: name,
                }).then(navigation.replace('EditAccount'))
                .catch()
            }
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
                        Editar nome
                    </Text>
                </View>
                <View style={styles.containerItem}>
                    <View style={styles.headerItem}>
                        <TextInput style={styles.userName} placeholder={deliveryman.name} placeholderTextColor="#FFF601" onChangeText={text=>setName(text)} autoCapitalize="none"/>
                    </View>
                </View> 
                
                <View style={styles.containerButtonSave}>
                    <TouchableOpacity style={styles.buttonSave} onPress={()=>save()}>
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
        backgroundColor: 'black',
        alignItems: 'center'
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: heightToDP('11%'),
        backgroundColor: '#FFF601',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: heightToDP('3%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    containerText: {
        width: widthToDP('88%'),
        marginTop: heightToDP('2%'),
        alignItems: 'flex-start'
     },
    textStatus: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF601',
        textAlign: 'center'
    },
    containerInputs: {
        flexDirection: 'row'
    },
    inputFirstName: {
        width: widthToDP('88%'),
        height: widthToDP('12%'),
        backgroundColor: '#333333',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('3%'),
    },
    containerItem: {
        marginTop: heightToDP('2%'),
        marginBottom: heightToDP('2%'),
        marginRight: widthToDP('5%'),
        marginLeft: widthToDP('5%'),
        width: widthToDP('90%'),
        padding: 15,
        backgroundColor: '#333333',
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowColor: '#FFF601',
        shadowOffset: { width: 0, height: 4 },
        elevation: 9

    },
    headerItem: {
        width: widthToDP('82.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userName: {
        width: widthToDP('84%'),
        color: '#FFF601',
        fontSize: 16
    },
    containerButtonSave: {
        marginTop: heightToDP('54%')
    },
    buttonSave: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF601',
        width: widthToDP('50%'),
        height: widthToDP('15%'),
        borderRadius: 15,
    },
    textButtonSave: {
        color: '#FFF601',
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerButton: {
        marginTop: heightToDP('3%')
    },
    textButton: {
        color: '#FFF601',
        fontSize: 18
    }, 

});
