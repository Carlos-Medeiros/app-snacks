import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import API from '../api';

const CELL_COUNT = 6;
export default function CodeValidation({ route, navigation }) {

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
          navigation.navigate('Register');
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        if (parseInt(numberKey) >= 100000) {
            API.post(`/keyValidation`, {
                email: email,
                numberValidation: parseInt(numberKey)
            }).then(setMenssage(''))
            .then(registerName)
        }
    }, [numberKey]);


    const emailValidationPut = () => {
        API.put(`/emailValidator/${email}/0`, {
        }).then(setMenssage(''))
    };

    const keyValidation = () => {
        API.post(`/keyValidation`, {
            email: email,
            numberValidation: parseInt(numberKey)
        }).then(setMenssage(''))
        .then(registerName)
        .catch(errorRegister)
    };

    const errorRegister = () => {
        setMenssage('Código invalido')
    }

    const register = () => {
        setMenssage('')
        navigation.navigate('Register')
    }

    const registerName = () => {
        setMenssage('')
        navigation.navigate('RegisterName', {userEmail: email})
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerSeta}>
                            <TouchableOpacity style={styles.imgSeta} onPress={()=>register()}>
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
        backgroundColor: '#191A1D',
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
        marginLeft: widthToDP('29%'),
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
        backgroundColor: '#2C2D34',
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
        backgroundColor: '#2C2D34',
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
        alignItems: 'center',
    },
    buttonResendCode: {
        width: widthToDP('30%'),
    },
    resendCode: {
        color: '#FFDD00'
    },
    containerButton: {
        marginTop: heightToDP('36%')
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
        fontSize: 18
    },
});
