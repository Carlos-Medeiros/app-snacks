import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import "@expo/match-media";


export default function Choice({ navigation }) {


    const login = () => {
        navigation.navigate('Login')
    }

    const register = () => {
        navigation.navigate('Register', {deliverymanCod: 0})
    }

    const registerDeliveryman = () => {
        navigation.navigate('Register', {deliverymanCod: 1})
    }


    return ( 
        <>
            <View style={styles.container}>   
                <View style={styles.containerHeader}>
                    <View style={styles.containerSeta}>
                        <TouchableOpacity style={styles.imgSeta} onPress={()=>login()}>
                            <Image source={require('../img/arrow1x.png')} ></Image>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.textRegister}>Cadastro</Text>
                </View>
                <View style={styles.containerBarras}>
                    <Text style={styles.textBarra}></Text>
                    <Text style={styles.textBarra}></Text>
                    <Text style={styles.textBarra}></Text>
                    <Text style={styles.textBarra}></Text>
                </View>
                <Text style={styles.textH1}>Olá, bem-vindo ao Lanches da Gê!</Text>
                <Text style={styles.textH2}>Você é entregador ou cliente?</Text>
                
                <View style={styles.containerButtonClient}>
                    <TouchableOpacity style={styles.buttonClient} onPress={()=>register()} >
                        <Text style={styles.textButton}>Fazer Pedido</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButtonDeliveryman}>
                    <TouchableOpacity style={styles.buttonDeliveryman} onPress={()=>registerDeliveryman()} >
                        <Text style={styles.textButton}>Entregar Pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        height: '100%',
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
        marginLeft: widthToDP('29%'),
        marginTop: heightToDP('2%'),
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra: {
        backgroundColor: '#F6F6F6',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6.4%')
    },
    textH1: {
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6.4%'),
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6.4%'),
        fontSize: 16
    },
    containerButtonClient: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightToDP('17%'),
    },
    buttonClient: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
        width: widthToDP('85%'),
        height: widthToDP('16%'),
        borderRadius: 15,
        justifyContent: 'center'
    },
    containerButtonDeliveryman: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightToDP('6%'),
    },
    buttonDeliveryman:{
        width: widthToDP('85%'),
        height: widthToDP('16%'),
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
        borderRadius: 15,
        justifyContent: 'center'
    },
    textButton: {
        textAlign: 'center',
        color: '#DB1020',
        fontSize: 18
    }
});
