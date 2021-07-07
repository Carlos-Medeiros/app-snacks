import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function RegisterName({ route, navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [menssage, setMenssage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const validationComplete = () => {
        setShowAlert(true)
    }

    const candelarCadastro = () => {
        navigation.navigate('Login')
    }

    const registerPhoneNumber = () => {
        if(firstName === '' && lastName === '') {
            setMenssage('Insira seu Nome e Sobrenome')
        }
        else {
            setMenssage('')
            navigation.navigate('RegisterPhoneNumber', {userName: firstName + ' ' + lastName, 
            userEmail: route.params.userEmail})
        }
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View>
                        <TouchableOpacity style={styles.imgSeta} onPress={()=>validationComplete()}>
                            <Image source={require('../img/arrow1x.png')} ></Image>
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
                    <TextInput style={styles.inputFirstName} placeholder="Nome" onChangeText={text=>setFirstName(text)} autoCapitalize="none"/>
                    <TextInput style={styles.inputLastName} placeholder="Sobrenome" onChangeText={text=>setLastName(text)} autoCapitalize="none"/>
                </View>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Alerta"
                    message="Falta pouco para finalizar seu cadastro"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Continuar cadastro"
                    cancelText="Candelar cadastro"
                    confirmButtonColor="#DB1020"
                    onConfirmPressed={() => {
                        setShowAlert(false)
                    }}
                    onCancelPressed={() => {
                        candelarCadastro();
                    }}

                />

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
        backgroundColor: 'white',
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
        marginTop: heightToDP('2%')
    },
    containerBarras: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBarra1: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra2: {
        backgroundColor: '#DB1020',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra3: {
        backgroundColor: '#F6F6F6',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textBarra4: {
        backgroundColor: '#F6F6F6',
        width: widthToDP('17%'),
        height: 4,
        borderRadius: 5,
        marginLeft: widthToDP('6%')
    },
    textH1: {
        marginTop: widthToDP('15%'),
        marginLeft: widthToDP('6%'),
        fontSize: 18,
        fontWeight: 'bold'
    },
    textH2: {
        marginTop: heightToDP('0.5%'),
        marginLeft: widthToDP('6%'),
        fontSize:16,
    },
    containerInputs: {
        flexDirection: 'row'
    },
    inputFirstName: {
        width: widthToDP('41%'),
        height: widthToDP('12%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('5%'),
        marginLeft: widthToDP('6%')
    },
    inputLastName: {
        width: widthToDP('41%'),
        height: widthToDP('12%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('5%'),
        marginLeft: widthToDP('6%')
    },
    menssageError:{
        color: '#DB1020',
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
        backgroundColor: '#DB1020',
        width: widthToDP('88%'),
        height: widthToDP('15%'),
        borderRadius: 15,
        marginLeft: widthToDP('6%')
    },
    textButton: {
        color: 'white',
        fontSize: widthToDP('4.5%')
    }
});
