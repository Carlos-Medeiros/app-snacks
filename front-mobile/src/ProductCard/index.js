import React, { useState} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';

export default function ProductCard({ route, navigation }) {

    return ( 
        <>
            <View style={styles.product1}>
                <TouchableOpacity style={styles.productButton}>
                    <View style={styles.productButton1}>
                        <Image source={require(`../img/hb_teste.png`)} style={styles.imgHb}/>
                    </View>
                    <View style={styles.containerDescription}>
                        <Text style={styles.productName}>Garanhuns</Text>
                        <Text style={styles.productDescription}>Para 02 pessoas. Filé de frango grelhado coberto com molho ...</Text>
                        <Text style={styles.productPrice}>R$ 13,00</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    productButton: {
        width: widthToDP('82.5%'),
        height: heightToDP('15.5%'), 
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0DEDE',
        borderRadius: 19,
        marginTop: heightToDP('2%'),
    },
    imgHb: {
        width: widthToDP('33%'),
        height: heightToDP('15%'),
        borderRadius: 18 
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    productDescription: {
        width:150,
        fontSize: 12,
        marginLeft: 16,
        marginTop: 2
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: widthToDP('25%'),
        marginTop: 4
    },  
});
