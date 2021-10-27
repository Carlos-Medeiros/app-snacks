import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import userService from '../Service/UserService';

const CELL_COUNT = 6;
export default function ForgotPasswordCode({ route, navigation }) {

    const [email, setEmail] = useState(route.params.userEmail);
    const [menssage, setMenssage] = useState('');
    const [numberKey, setNumberKey] = useState('');
    const ref = useBlurOnFulfill({numberKey, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        numberKey,
      setNumberKey,
    });

    useEffect(() => {
        function handleBackButton() {
          navigation.navigate('ForgotPasswordHome');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        if (parseInt(numberKey) >= 100000) {
            let data = {
                email: email,
                numberValidation: parseInt(numberKey)
            }
            userService.sendCode(data)
            .then(forgotPassword)
            .catch(errorRegister)
        }
    }, [numberKey]);

    const emailValidationPut = () => {
        userService.resendCode(email)
        .then(setMenssage(''))
        .catch()
    };

    const keyValidation = () => {
        let data = {
            email: email,
            numberValidation: parseInt(numberKey)
        }
        userService.sendCode(data)
        .then(forgotPassword)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setMenssage('Código invalido')
    }

    const forgotPasswordHome = () => {
        setMenssage('')
        navigation.navigate('ForgotPasswordHome')
    }

    const forgotPassword = () => {
        setMenssage('')
        navigation.navigate('ForgotPassword', {userEmail: email})
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerSeta}>
                            <TouchableOpacity style={styles.imgSeta} onPress={()=>forgotPasswordHome()}>
                                <Image source={require('../img/arrow_yellow.png')} ></Image>
                            </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}>Recuperação</Text>
                </View>            
                <View style={styles.containerBarras}>
                    <Text style={styles.textBarra1}></Text>
                    <Text style={styles.textBarra2}></Text>
                    <Text style={styles.textBarra3}></Text>
                </View>
                <Text style={styles.textH1}>Insira o código que enviamos a você</Text>
                <Text style={styles.textH2}>Insira o código</Text>
                <CodeField
                    ref={ref}
                    {...props}
                    caretHidden={false}
                    value={numberKey}
                    onChangeText={setNumberKey}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
                <View style={styles.containerError}>
                    <Text style={styles.textVisible}>{menssage}</Text>
                </View>

                <View style={styles.containerResendCode}>
                    <TouchableOpacity style={styles.buttonResendCode} onPress={()=>emailValidationPut()}>
                        <Text style={styles.resendCode}>Reenviar código</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={()=>keyValidation()}>
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
        marginLeft: widthToDP('25.5%'),
        marginTop: heightToDP('2%'),
        color: '#FFDD00'
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#FFDD00',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#FFDD00',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#191A1D',
        width: widthToDP('25.33%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: heightToDP('8%'),
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
    codeFieldRoot: {
        marginTop: heightToDP('5%'),
        width: widthToDP('88%'),
        marginLeft: widthToDP('6%')
    },
    cell: {
        width: 50,
        height: 50,
        borderRadius: 15,
        lineHeight: 40,
        fontSize: 24,
        backgroundColor: '#191A1D',
        textAlign: 'center',
        color: '#FFDD00',
    },
    focusCell: {
        borderColor: '#FFDD00',
        borderWidth: 2,
    },
    containerError: {
        flexDirection: 'row',
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%')
    },
    textVisible: {
        color: '#FFDD00',
    },
    containerResendCode: {
        marginTop: heightToDP('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonResendCode: {
        width: widthToDP('30%')
    },
    resendCode: {
        color: '#FFDD00',
        textAlign: 'center'
    },
    containerButton: {
        marginTop: heightToDP('34%')
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
        fontSize: 18
    },
});
