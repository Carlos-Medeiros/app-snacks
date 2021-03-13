import { HeaderHeightContext } from '@react-navigation/stack';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';
import Header from '../Header/header';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phones, setPhones] = useState('');

    async function cadastro() {
        let response = await API.post('/register', {
            name: name,
            email: email,
            password: password,
            phones: phones
        })
    } 
    return ( 
        <>
            <Header />
            <View style={styles.container}>
                <TextInput placeholder="Seu nome..." style={styles.textInput} onChangeText={text=>setName(text)}/>
                <TextInput placeholder="Seu email..." style={styles.textInput} onChangeText={text=>setEmail(text)}/>
                <TextInput secureTextEntry={true} placeholder="Sua senha..." style={styles.textInput} onChangeText={text=>setPassword(text)}/>
                <TextInput placeholder="Seu telefone..." style={styles.textInput} onChangeText={text=>setPhones(text)}/>

                <TouchableOpacity onPress={()=>cadastro()}>
                    <Text style={styles.textButton}>Prosseguir</Text>
                </TouchableOpacity>
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
        paddingTop: 10
    }
});
