import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import { TextInputMask } from 'react-native-masked-text';
import API from '../api';
import userService from '../Service/UserService';

export default function EditPhone({route, navigation }) {
   
    const [email, setEmail] = useState(route.params.userEmail);
    const [deliveryman, setDeliveryman] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState();
    const [menssage, setMenssage] = useState('');
    const cellRef = useState(null);

    useEffect(() => {
        function handleBackButton() {
          navigation.replace('EditAccount', {userEmail: email});
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

    useEffect(() => {
        userService.userDetails()
        .then((response) => {
            setDeliveryman(response.data),
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const validPhone = () => {
        var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
        const phoneUnmask = cellRef?.current.getRawValue();
        if (regex.test(phoneUnmask)) { 
            setMenssage("");
            let data = {
                phones: phoneNumber
            }
            userService.editPhone(data)
            .then(navigation.replace('EditAccount', {userEmail: email}))
            .catch((error) => {
                console.log(error)
            })
            //API.put(`/editPhoneNumber/deliveryman/${email}`, {
             //   phones: phoneNumber,
            //}).then(navigation.replace('EditAccount', {userEmail: email}))
           // .catch()
        }
        else setMenssage("Telefone inválido");
    }

    const editAccount = () => {
        navigation.replace('EditAccount', {userEmail: email})
    }

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }


    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <TouchableOpacity onPress={home}>
                        <Text style={styles.logo}>Delivery da Gé</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textStatus}>
                        Editar telefone
                    </Text>
                </View>
                <View style={styles.containerInput}>
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
                </View> 
                <View style={styles.containerErro}>
                    <Text style={styles.textError}>{menssage}</Text>
                </View>
                
                <View style={styles.containerButtonSave}>
                    <TouchableOpacity style={styles.buttonSave} onPress={()=>validPhone()}>
                        <Text style={styles.textButtonSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.button} onPress={()=>editAccount()}>
                            <Text style={styles.textButton}>Cancelar</Text>
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
        alignItems: 'center'
    },
    containerHeader: {
        width: widthToDP('100%'),
        height: heightToDP('11%'),
        backgroundColor: '#FFDD00',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: heightToDP('3%'),
        fontSize: 18,
        fontWeight: 'bold',
        color: '#121315'
    },
    containerText: {
        width: widthToDP('88%'),
        marginTop: heightToDP('2%'),
        alignItems: 'flex-start'
     },
    textStatus: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFDD00',
        textAlign: 'center'
    },
    containerInput: {
        flexDirection: 'row'
    },
    inputPhoneNumber: {
        width: widthToDP('88%'),
        height: widthToDP('12%'),
        backgroundColor: '#2C2D34',
        borderRadius: 15,
        marginTop: heightToDP('4%'),
        fontSize: 24,
        paddingLeft: 65,
        letterSpacing: 2,
        color: '#FFDD00'
    },
    containerErro: {
        width: widthToDP('100%'),
        marginTop: heightToDP('1%'),
    },  
    textError: {
        color: '#FFDD00',
        marginLeft: widthToDP('6%')
    },
    containerButtonSave: {
        marginTop: heightToDP('50%')
    },
    buttonSave: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFDD00',
        width: widthToDP('50%'),
        height: widthToDP('15%'),
        borderRadius: 15,
    },
    textButtonSave: {
        color: '#FFDD00',
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerButton: {
        marginTop: heightToDP('3%')
    },
    textButton: {
        color: '#FFDD00',
        fontSize: 18
    }, 

});
