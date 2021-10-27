import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import { TextInputMask } from 'react-native-masked-text';

export default function RegisterPhoneNumber({ route, navigation }) {

    const [email, setEmail] = useState(route.params.userEmail);
    const [name, setName] = useState(route.params.userName);
    const [phoneNumber, setPhoneNumber] = useState();
    const [menssage, setMenssage] = useState('');
    const cellRef = useState(null);

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('RegisterName');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    const registerName = () => {
        navigation.navigate('RegisterName')
    }

    const validPhone = () => {
        var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
        const phoneUnmask = cellRef?.current.getRawValue();
        if (regex.test(phoneUnmask)) { 
            setMenssage("");
            navigation.navigate('RegisterPassword', {userName: name, 
            userEmail: email, userPhoneNumber: phoneNumber})
        }
        else setMenssage("Telefone inválido");
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerSeta}>
                        <TouchableOpacity style={styles.imgSeta} onPress={()=>registerName()}>
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

                <Text style={styles.textH1}>Olá, bem-vindo ao Lanches da Gê!</Text>
                <Text style={styles.textH2}>Digite o número do seu celular</Text>
                <TextInputMask 
                    style={styles.inputPhoneNumber} 
                    type={'cel-phone'} 
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                        
                    }} 
                    placeholder="(81) 91234-5678" 
                    placeholderTextColor="#707070"
                    value={phoneNumber}
                    
                    onChangeText={val=>setPhoneNumber(val)} 
                    ref={cellRef}
                />

                <Text style={styles.textError}>{menssage}</Text>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>validPhone()}>
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
        backgroundColor: '#FFDD00',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra4: {
        backgroundColor: '#191A1D',
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
        fontSize: 16,
        color: '#FFDD00'
    },
    inputPhoneNumber: {
        width: widthToDP('88%'),
        height: widthToDP('12%'),
        backgroundColor: '#191A1D',
        borderRadius: 15,
        marginTop: heightToDP('7%'),
        marginLeft: widthToDP('6%'),
        fontSize: 24,
        paddingLeft: 65,
        letterSpacing: 2,
        color: '#FFDD00'
    },
    containerButton: {
        marginTop: heightToDP('41.5%')
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
        color: '#191A1D',
        fontSize: widthToDP('4.5%')
    },
    textError: {
        marginLeft: widthToDP('6%'),
        color: '#FFDD00'
    }
});
