import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {widthToDP, heightToDP} from '../Responsive';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import API from '../api';

type Props = {
    route: {
        params: {
            order: Order;
        }
    }
}

export default function OrderDetails({ route }: Props) {
    const { order } = route.params;
    const navigation = useNavigation();

    const orders = () => {
        navigation.navigate('RequestsDeliveryman')
    }

    const delivered = () => {
        API.put(`/orders/${order.id}/delivered`, {
        }).then(() => {
            Alert.alert(`Pedido ${order.code} confirmado com sucesso!`);
            navigation.navigate('RequestsDeliveryman');
        }) 
        .catch(() => {
            Alert.alert(`Houve um erro ao confirmar o pedido ${order.code}`)
        })
    }
    
    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.logo}>Delivery da Gé</Text>
                </View>
                <View style={styles.margin}></View>
                <OrderCard order={order}/>
                <RectButton style={styles.button}>
                    <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={delivered}>
                    <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={orders}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                </RectButton>
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
    margin: {
        marginTop: heightToDP('4%')
    },
    button: {
        backgroundColor: '#DB1020',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        letterSpacing: -0.24
    }
});
