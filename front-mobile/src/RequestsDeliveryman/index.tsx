import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthToDP, heightToDP} from '../Responsive';
import OrderCard from '../OrderCard';
import API from '../api';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Order } from '../types';

export default function RequestsDeliveryman() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [number, setNumber] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = () => {
        API.get(`orders/readyForDelivery`, {
        }).then(response => setOrders(response.data))
        .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
    } 

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    },[isFocused]);

    const home = () => {
        navigation.navigate('HomeDeliveryman')
    }

    const orderDetails = (order: Order) => {
        navigation.navigate('OrderDetails', {
            order
        });
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerLogo}>
                        <TouchableOpacity onPress={()=>home()}>
                            <Text style={styles.logo}>Delivery da Gé</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.containerOrders}>
                {orders.map(order => (
                        <RectButton 
                        key={order.id} 
                        onPress={()=> orderDetails(order)}>
                            <OrderCard order={order}/>
                        </RectButton>
                    ))}      
                </ScrollView>
               
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
    containerLogo: {
        marginTop: heightToDP('3%')
    },  
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }, 
    containerOrders: {
        marginTop: heightToDP('2%'),
    }
});
