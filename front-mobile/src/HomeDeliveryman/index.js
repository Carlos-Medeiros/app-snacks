import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeDeliveryman({ route, navigation }) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnPressLogin = () => {
        navigation.navigate('Login')
    }

    const handleOnPressEmail = () => {
        navigation.navigate('EmailValidator')
    }

    return ( 
        <>
            <View>
                <Text style={styles.textBemVindo}>Bem vindo, deliveryman {route.params.userEmail}</Text>
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
