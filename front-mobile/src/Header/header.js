import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Header({ navigation }) {

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    return (   
        <View style={styles.containerHeader}>
            <TouchableWithoutFeedback style={styles.imgSeta} onPress={()=>handleLogin()}>
                <Image source={require('../img/arrow1x.png')} ></Image>
            </TouchableWithoutFeedback>
            <Text style={styles.textRegister}>Register</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        height: 116,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgSeta: {
        marginLeft: 13
    },
    textRegister: {
        fontSize: 16,
        marginLeft: '33%'
    }
});