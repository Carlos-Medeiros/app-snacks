import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({ route, navigation }) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sair = () => {
        navigation.replace('Login')
    }

    const handleOnPressEmail = () => {
        navigation.navigate('EmailValidator')
    }

    return ( 
        <>
            <View>
                <Text style={styles.textBemVindo}>Bem vindo, {route.params.userEmail}</Text>
                <TouchableOpacity onPress={()=>sair()}>
                    <Text>SAIR</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textBemVindo: {
        marginTop: 100,
        fontSize: 40
    }
});
