import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Header from '../Header/header';

export default function Home() {
   
    const navigation = useNavigation();

    const handleOnPress = () => {
        navigation.navigate('Register')
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
            <View>
            <RectButton onPress={handleOnPress}>
                <Text>Cadastre-se</Text>
            </RectButton>
            <RectButton onPress={handleOnPressEmail}>
                <Text>Valide seu email</Text>
            </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    text: {

    }
});