import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import API from '../api';
import userService from '../Service/UserService';

export default function EditName({route, navigation }) {

    const [email, setEmail] = useState(route.params.userEmail);
    const [deliveryman, setDeliveryman] = useState([]);
    const [name, setName] = useState('');
    const [menssage, setMenssage] = useState('');

    useEffect(() => {
        userService.userDetails()
        .then((response) => {
            setDeliveryman(response.data),
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const editAccount = () => {
        navigation.replace('EditAccount', {userEmail: email})
    }

    const home = () => {
        navigation.replace('HomeDeliveryman')
    }

    const save = () => {
        if(name === '') {
            setMenssage('O nome não pode ficar em branco')
        }
        else {
            setMenssage('')
            let data = {
                name: name
            }
            userService.editName(data)
            .then(navigation.replace('EditAccount', {userEmail: email}))
            .catch((error) => {
                console.log(error)
            })
           // API.put(`/editName/deliveryman/${email}`, {
            //    name: name,
            //}).then(navigation.replace('EditAccount', {userEmail: email}))
            //.catch()
        }
    }

    useEffect(() => {
        function handleBackButton() {
          navigation.replace('EditAccount', {userEmail: email});
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [navigation]);

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
                        Editar nome
                    </Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput style={styles.inputName} placeholder={deliveryman.name} placeholderTextColor="#707070" onChangeText={text=>setName(text)} autoCapitalize="none"/>
                </View> 
                <View style={styles.containerErro}>
                    <Text style={styles.textError}>{menssage}</Text>
                </View>
                
                <View style={styles.containerButtonSave}>
                    <TouchableOpacity style={styles.buttonSave} onPress={()=>save()}>
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
    inputName: {
        width: widthToDP('88%'),
        height: widthToDP('13%'),
        backgroundColor: '#2C2D34',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: heightToDP('4%'),
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
