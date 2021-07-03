import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import OrderCard from '../OrderCard';
import API from '../api';

export default function RequestsDeliveryman({ route, navigation }) {

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerLogo}>
                        <TouchableOpacity style={styles.buttonLogo} onPress={()=>home()}>
                            <Text style={styles.logo}>Delivery da Gé</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.containerOrders}>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
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
