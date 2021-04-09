import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';

export default function DeliverymanStatus({ route, navigation }) {

    const [deliverymanStatus, setDeliverymanStatus] = useState([]);

    useEffect(() => {
        API.get(`/${route.params.userEmail}/status`, {
        }).then((response) => {setDeliverymanStatus(response.data)}
        )}, []);


    useEffect(() => {
        if (deliverymanStatus.status === 'ACCEPTED') {
            navigation.navigate('HomeDeliveryman', {deliverymanEmail: route.params.userEmail})
        }
    }, [deliverymanStatus.status]);
        
    


    return ( 
        <>
            <View style={styles.container}>
                <Text>{deliverymanStatus.status}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20
    },
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#E2E2E2',
        borderRadius: 20,
        paddingLeft: 10,
        marginTop: 20
    },
    textButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    textButtonEsqueceu: {
        marginLeft: '7%'
    },
    textButtonCadastro: {
        marginLeft: '7%'
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }, 
    button: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 15,
        backgroundColor: '#DB1020',
        marginTop: '20%'
    }
});
