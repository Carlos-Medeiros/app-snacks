import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API from '../api';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [menssage, setMenssage] = useState('');

    setTimeout(() => {
    }, 5000);

    const handleLogin = () => {
        API.post(`/login`, {
            email: email,
            password: password
        }).then(setMenssage(''))
        .then(home)
        .catch(handleLoginDeliveryman)
    };

    const handleLoginDeliveryman = () => {
        API.post(`/login/deliveryman`, {
            email: email,
            password: password
        }).then(setMenssage(''))
        .then(homeDeliveryman)
        .catch(setMenssage('email ou senha invalidos'))
    };

    const home = () => {
        navigation.navigate('Home', {userEmail: email})
    }

    const homeDeliveryman = () => {
        navigation.navigate('HomeDeliveryman', {userEmail: email})
    }

    const choice = () => {
        setMenssage('')
        navigation.navigate('Choice', {userEmail: email})
    }

    const forgotPassword = () => {
        setMenssage('')
        navigation.navigate('ForgotPassword')
    }

    return ( 
        <>
            <View style={styles.container}>
                <Text style={styles.textH1}>LANCHES DA GÊ</Text>
                <Text style={styles.textBarra}></Text>
                <Text style={styles.textH2}>delivery</Text>
                <TextInput style={styles.InputEmail} placeholder="Seu email..." onChangeText={text=>setEmail(text)}/>
                <Text style={styles.textMenssage}>{menssage}</Text>
                <TextInput style={styles.InputPassword} placeholder="Sua senha..." onChangeText={text=>setPassword(text)}/>
                
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.buttonOPacity} onPress={()=>forgotPassword()}>
                        <Text style={styles.textOpacity}>Forgot password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEntrar} onPress={()=>handleLogin()}>
                        <Text style={styles.textEntrar}>Entrar</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.buttonCadastrese} onPress={()=>choice()}>
                        <Text style={styles.textCadastrese}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    textBarra: {
        backgroundColor: '#DB1020',
        width: 414,
        height: 2
    },
    textH1: {
        marginTop: 184,
        textAlign: 'center',
        color: '#DB1020',
        fontSize: 40,
        fontWeight: 'bold'
    },
    textH2: {
        textAlign: 'center',
        paddingTop: -100,
        color: '#DB1020',
        fontSize: 40,
        fontStyle: 'italic'
    },
    InputEmail: {
        backgroundColor: '#F6F6F6',
        width: 350,
        height: 50,
        borderRadius: 15,
        marginTop: '20%',
        marginLeft: '7%',
        paddingLeft: 15
    },
    textMenssage: {
        color: '#DB1020',
        marginLeft: '7%'
    },
    InputPassword: {
        backgroundColor: '#F6F6F6',
        width: 350,
        height: 50,
        borderRadius: 15,
        marginTop: 20,
        marginLeft: '7%',
        paddingLeft: 15
    },
    containerButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOPacity: {
        marginTop: '3%'
    },
    textOpacity: {
        fontSize: 12,
        color: '#848484'
    },
    textEntrar: {
        textAlign: 'center',
        color: '#DB1020',
        fontSize: 18
    }, 
    buttonEntrar: {
        justifyContent: 'center',
        height: 50,
        width: 260,
        marginTop: '7%',
        borderRadius: 15,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#DB1020',
    },
    buttonCadastrese: {
        marginTop: '9%'
    },
    textCadastrese: {
        color: '#DB1020',
        fontSize: 16
    }, 
});
