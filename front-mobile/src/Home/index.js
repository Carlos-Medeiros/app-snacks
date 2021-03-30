import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Header from '../Header/header';

export default function Home({navigation}) {
   
    const handleOnPressLogin = () => {
        navigation.navigate('Login')
    }

    const handleOnPressEmail = () => {
        navigation.navigate('EmailValidator')
    }

    return ( 
        <>
            <View>
                <Header />
                <Text>Snacks</Text>
            </View>
            <View style={styles.container}>
            <RectButton style={styles.button} onPress={handleOnPressLogin}>
                <Text style={styles.text}>Fazer Pedido</Text>
            </RectButton>
            <RectButton style={styles.button}>
                <Text style={styles.text}>Entregar Pedido</Text>
            </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }, 
    button: {
        justifyContent: 'center',
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 25,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#DB1020'
    }
});
