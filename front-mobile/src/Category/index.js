import React, { useState} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';

export default function Category({ route, navigation }) {

    return ( 
        <>
            <View style={styles.categoryContainer}>
                <TouchableOpacity style={styles.buttonCategory1}>
                    <Text style={styles.category1}> 
                        Hambúrguer
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        width: 80,
        height: 41,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: widthToDP('4.5%'),
        marginTop: heightToDP('2%')
    },
    buttonCategory1: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#DB1020',
        borderWidth: 2
    },
    category1: {
        color: '#DB1020',
        fontSize: 11,
        fontWeight: 'bold'
    },
});
