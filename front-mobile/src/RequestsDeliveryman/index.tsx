import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import OrderCard from '../OrderCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Order } from '../types';
import userService from '../Service/UserService';

export default function RequestsDeliveryman() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [number, setNumber] = useState(0);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = () => {
        userService.allOrderDelivery()
        .then(response => setOrders(response.data))
        .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
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
    containerLogo: {
        marginTop: heightToDP('3%')
    },  
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#191A1D'
    }, 
    containerOrders: {
        marginTop: heightToDP('2%'),
    }
});
