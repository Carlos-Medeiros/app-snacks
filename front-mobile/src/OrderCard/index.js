import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthToDP, heightToDP} from '../Responsive';

export default function OrderCard() {
    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.orderName}>Pedido 1</Text>
                    <Text style={styles.orderPrice}>R$ 50.00</Text>
                </View>
                <Text style={styles.text}>Há 30min</Text>
                <View style={styles.productList}>
                    <Text style={styles.text}>Pizza Calabresa</Text>
                    <Text style={styles.text}>Pizza Calabresa</Text>
                    <Text style={styles.text}>Pizza Calabresa</Text>
                </View>
            </View>               
        </>
    );
}

const styles = StyleSheet.create({
    container: {
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
    shadowStyle: {

    },
    header: {
        width: widthToDP('82.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#9E9E9E',
    },
    orderName: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#263238',
    },
    orderPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'right',
        letterSpacing: -0.24,
        color: '#DA5C5C',
    
    },
    productList: {
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
        marginTop: 20,
        paddingTop: 15
    }
});
