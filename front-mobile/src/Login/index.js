import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';


export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        let response = await API.post('/login', {
            email: email,
            password: password,
        })
    } 

    const forgotYourPassword = () => {
        navigation.navigate('Register')
    }

    const register = () => {
        navigation.navigate('Register')
    }

    return ( 
        <>
            <View style={styles.container}>
                <TextInput placeholder="Seu email..." style={styles.textInput} onChangeText={text=>setEmail(text)}/>
                <TextInput secureTextEntry={true} placeholder="Sua senha..." style={styles.textInput} onChangeText={text=>setPassword(text)}/>
               <View style={styles.textButton}>
                    <TouchableOpacity onPress={()=>forgotYourPassword()}>
                        <Text style={styles.textButtonEsqueceu}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>register()}>
                        <Text style={styles.textButtonCadastro}>Cadastre-se</Text>
                    </TouchableOpacity>
               </View>

               <TouchableOpacity style={styles.button} onPress={()=>login()}>
                    <Text style={styles.text}>Prosseguir</Text>
                </TouchableOpacity>
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
