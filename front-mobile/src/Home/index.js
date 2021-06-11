import React, { useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';

export default function Home({ route, navigation }) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sair = () => {
        navigation.replace('Login')
    }

    const handleOnPressEmail = () => {
        navigation.navigate('EmailValidator')
    }

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require(`../img/logo_branca.png`)} style={styles.logo}/>
                </View>
                <View style={styles.categories}>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Image source={require(`../img/hamburguer.png`)} style={styles.iconHamburguer}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Image source={require(`../img/batata.png`)} style={styles.iconBatata}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Image source={require(`../img/espetinho.png`)} style={styles.iconEspetinho}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Image source={require(`../img/bebida.png`)} style={styles.iconBebida}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.category}>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Image source={require(`../img/hamburguer.png`)} style={styles.iconHamburguer}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.products}>
                    <View style={styles.product}>
                        <TouchableOpacity style={styles.productButton}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.product}>
                        <TouchableOpacity style={styles.productButton}>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.product}>
                        <TouchableOpacity style={styles.productButton}>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/home.png`)} style={styles.iconHome}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/bag.png`)} style={styles.iconCarCompras}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/conta.png`)} style={styles.iconConta}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/peopple.png`)} style={styles.iconPeopple}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#DB1020',
        width: widthToDP('100%'),
        height: widthToDP('16%'),
        marginTop: heightToDP('3%'),
        justifyContent: 'center'
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    category: {
        backgroundColor: 'gray',
        width: widthToDP('17.6%'),
        height: heightToDP('7.5%'),
        marginLeft: widthToDP('6%'),
        marginTop: heightToDP('2%'),
        backgroundColor: '#DB1020',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    iconHamburguer: {
        width: 39,
        height: 36
    },
    iconBatata: {
        width: 26,
        height: 41
    },
    iconEspetinho: {
        width: 39,
        height: 39
    },
    iconBebida: {
        width: 13,
        height: 40
    },
    iconHamburguer: {
        width: 39,
        height: 36
    },
    products: {
        marginLeft: widthToDP('6%'),
        width: widthToDP('88%'),
        height: heightToDP('65%'),
        marginTop: heightToDP('2%')
    },
    product: {
        backgroundColor: 'gray',
        width: widthToDP('88%'),
        height: heightToDP('20%'),
        marginTop: heightToDP('2%'),
        borderRadius: 50
    },
    footer: {
        backgroundColor: '#DB1020',
        width: widthToDP('100%'),
        height: widthToDP('16%'),
        marginTop: heightToDP('3%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconFooter: {
        marginLeft: widthToDP('6%'),
        width: widthToDP('18%'),
        height: heightToDP('9%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconHome: {
        width: 32,
        height: 32
    },
    iconCarCompras: {
        width: 31,
        height: 37
    },
    iconConta: {
        width: 25,
        height: 36
    },
    iconPeopple: {
        width: 30,
        height: 34
    }
});
