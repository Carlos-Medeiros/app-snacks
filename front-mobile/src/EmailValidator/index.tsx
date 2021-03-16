import { HeaderHeightContext } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';
import Header from '../Header/header';

export default function EmailValidator() {

    const [email, setEmail] = useState('');
    const [validator, setValidator] = useState(0);

    const [validatorInput, setValidatorInput] = useState(1);

    async function sendEmail() {
        let response = await API.post('/emailValidator', {
            email: email,
            validator: validator
        })
    }

    const navigation = useNavigation();

    const handleOnPress = () => {
        if (validator == validatorInput) {
            navigation.navigate('Register')
        }
        else {
            console.error(Error);
        }
    }

    return ( 
        <>
            <Header />
            <View style={styles.container}>
                <TextInput placeholder="Seu email..." style={styles.textInput} onChangeText={text=>setEmail(text)}/>
                <TextInput placeholder="Digit o código de validação" style={styles.textInput} onChangeText={text=>setValidator(0)}/>


                <TouchableOpacity onPress={()=>sendEmail()}>
                    <Text style={styles.textButton}>Envia Email</Text>
                </TouchableOpacity>
                <RectButton onPress={handleOnPress}>
                    <Text style={styles.textButton}>Verificar</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom: 10
    },
    textButton: {
        paddingTop: 10,
        paddingBottom: 10
    }
});
