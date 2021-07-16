import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';

export default function RegisterName({ route, navigation }) {

    const [firstName, setFirstName] = useState('');
    const [menssage, setMenssage] = useState('')
    const [email, setEmail] = useState(route.params.userEmail);

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('Register');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    const candelarCadastro = () => {
        navigation.navigate('Register')
    }

    const registerPhoneNumber = () => {
        if(firstName === '') {
            setMenssage('Insira seu Nome')
        }
        else {
            setMenssage('')
            navigation.navigate('RegisterPhoneNumber', {userName: firstName, 
            userEmail: email})
        }
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View>
                        <TouchableOpacity style={styles.imgSeta} onPress={()=>candelarCadastro()}>
                            <Image source={require('../img/arrow_yellow.png')} ></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Cadastro</Text>
                </View>            
                <View style={styles.containerBarras}>
                    <Text style={styles.textBarra1}></Text>
                    <Text style={styles.textBarra2}></Text>
                    <Text style={styles.textBarra3}></Text>
                    <Text style={styles.textBarra4}></Text>
                </View>

                <Text style={styles.textH1}>Como você quer ser chamado?</Text>
                <Text style={styles.textH2}>Digite seu nome</Text>
                <View style={styles.containerInputs}>
                    <TextInput style={styles.inputFirstName} placeholder="Nome" placeholderTextColor="#707070" onChangeText={text=>setFirstName(text)} autoCapitalize="none"/>
                </View>
                <Text style={styles.menssageError}>{menssage}</Text>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>registerPhoneNumber()}>
                        <Text style={styles.textButton}>Prosseguir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121315',
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: widthToDP('26%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgSeta: {
        width: widthToDP('12%'),
        height: widthToDP('10%'),
        paddingLeft: widthToDP('3%'),
        justifyContent: 'center',
        marginTop: heightToDP('2%')
    },
    textRegister: {
        fontSize: 16,
        marginLeft: widthToDP('28%'),
        marginTop: heightToDP('2%'),
        color: '#FFDD00'
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#FFDD00',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#FFDD00',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#2C2D34',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra4: {
        backgroundColor: '#2C2D34',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: widthToDP('15%'),
        marginLeft: widthToDP('6%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFDD00'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%'),
        fontSize:16,
        color: '#FFDD00'
    },
    containerInputs: {
        flexDirection: 'row'
    },
    inputFirstName: {
        width: widthToDP('88%'),
        height: widthToDP('12%'),
        backgroundColor: '#2C2D34',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('5%'),
        marginLeft: widthToDP('6%'),
        color: '#FFDD00'
    },
    menssageError:{
        color: '#FFDD00',
        fontSize: 14,
        marginLeft: widthToDP('6%'),
        marginTop: heightToDP('0.5%')
    },  
    containerButton: {
        marginTop: heightToDP('43%')
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFDD00',
        width: widthToDP('88%'),
        height: widthToDP('15%'),
        borderRadius: 15,
        marginLeft: widthToDP('6%')
    },
    textButton: {
        color: '#2C2D34',
        fontSize: widthToDP('4.5%')
    }
});
