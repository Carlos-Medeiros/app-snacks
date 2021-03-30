import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, InteractionManager } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';
import Header from '../Header/header';

export default function EmailValidator({navigation}) {

    const [email, setEmail] = useState('');
    {/*const [validator, setValidator] = useState();*/}

    const [validatorInput, setValidatorInput] = useState(0);

    async function sendEmail() {
        let response = await API.post('/emailValidator', {
            email: email,
            numberValidation: numberRandom()
        })
    }

    

    function numberRandom() {
        let number = Math.floor(Math.random() * (999999 - 100000) + 100000);
        return number
    }

    let number = 123456


    console.log(numberRandom())

    const handleOnPress = () => {
        if (emailValidation.numberValidation === validatorInput) {
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
                <TouchableOpacity onPress={()=>sendEmail()}>
                    <Text style={styles.textButton}>Envia Email</Text>
                </TouchableOpacity>
                <TextInput placeholder="Digit o código de validação" style={styles.textInput} onChangeText={text=>setValidatorInput(0)}/>

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
