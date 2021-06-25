import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthToDP, heightToDP} from '../Responsive';
import ProductCard from '../ProductCard';
import Category from '../Category';
import API from '../api';

export default function Home({ route, navigation }) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sair = () => {
        navigation.replace('Login')
    }

    const handleOnPressEmail = () => {
        navigation.navigate('EmailValidator')
    }



    const [category, setCategory] = useState([]);

    useEffect(() => {
        API.get(`/categorys`, {})
        .then((response) => {setCategory(response.data)})
        .then((response) => {console.log(response.data)})
        .catch(error => console.log(error))
    },[]);

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.perfil}>
                        <TouchableOpacity style={styles.perfilButton}>
                            <Image source={require(`../img/perfil_gray.png`)} style={styles.iconPerfil}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput style={styles.search}/>
                        <Image source={require(`../img/search.png`)} style={styles.iconSearch}/>
                    </View>
                    <View style={styles.bag}>
                        <TouchableOpacity style={styles.bagButton}>
                            <Image source={require(`../img/bag_gray.png`)} style={styles.iconbag}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.categories}>
                    <Category/>
                    <Category/>
                    <Category/>
                    <Category/>
                    <Category/>
                </View>
                <View style={styles.products}>
                    <View style={styles.product1}>
                        <TouchableOpacity style={styles.productButton}>
                            <View style={styles.productButton1}>
                                <Image source={require(`../img/hb_teste.png`)} style={styles.imgHb}/>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.productName}>Garanhuns</Text>
                                <Text style={styles.productDescription}>Para 02 pessoas. Filé de frango grelhado coberto com molho ...</Text>
                                <Text style={styles.productPrice}>R$ 13,00</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.product1}>
                        <TouchableOpacity style={styles.productButton}>
                            <View style={styles.productButton1}>
                                <Image source={require(`../img/hb_teste.png`)} style={styles.imgHb}/>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.productName}>Garanhuns</Text>
                                <Text style={styles.productDescription}>Para 02 pessoas. Filé de frango grelhado coberto com molho ...</Text>
                                <Text style={styles.productPrice}>R$ 13,00</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.product1}>
                        <TouchableOpacity style={styles.productButton}>
                            <View style={styles.productButton1}>
                                <Image source={require(`../img/hb_teste.png`)} style={styles.imgHb}/>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.productName}>Garanhuns</Text>
                                <Text style={styles.productDescription}>Para 02 pessoas. Filé de frango grelhado coberto com molho ...</Text>
                                <Text style={styles.productPrice}>R$ 13,00</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.product1}>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </View>
                   
                </View>
                <View style={styles.footer}>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/home_red_2.png`)} style={styles.iconHome}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/save_gray.png`)} style={styles.iconFavoritos}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/lista_gray.png`)} style={styles.iconConta}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconFooter}>
                        <TouchableOpacity style={styles.iconButton}>
                        <Image source={require(`../img/local_gray.png`)} style={styles.iconLocalizacao}/>
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
        width: widthToDP('100%'),
        height: widthToDP('16%'),
        marginTop: heightToDP('3%'),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    perfilButton: {
        marginRight: 24,
        width: 22,
        height: 27.5
    },
    iconPerfil: {
        width: 22,
        height: 27.5
    },
    search: {
        width: 268,
        height: 38,
        marginTop: -11,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#ACACAC'
    },
    iconSearch: {
        width: 15,
        height: 15,
        marginLeft: 10,
        marginTop: -27
    },
    bagButton: {
        marginLeft: 24,
        width: 23,
        height: 27.6
    },
    iconbag: {
        width: 23,
        height: 27.6
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryContainer: {
        width: 80,
        height: 41,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: widthToDP('4.5%'),
        marginTop: heightToDP('2%')
    },
    buttonCategory1: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#DB1020',
        borderWidth: 2
    },
    buttonCategory2: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#ACACAC',
        borderWidth: 2
    },
    buttonCategory3: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#ACACAC',
        borderWidth: 2
    },
    buttonCategory4: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#ACACAC',
        borderWidth: 2
    },
    buttonCategory5: {
        width: 80,
        height: 41,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#ACACAC',
        borderWidth: 2
    },
    category1: {
        color: '#DB1020',
        fontSize: 11,
        fontWeight: 'bold'
    },
    category2: {
        color: '#ACACAC',
        fontSize: 11,
        fontWeight: 'bold'
    },
    category3: {
        color: '#ACACAC',
        fontSize: 11,
        fontWeight: 'bold'
    },
    category4: {
        color: '#ACACAC',
        fontSize: 11,
        fontWeight: 'bold'
    },
    category5: {
        color: '#ACACAC',
        fontSize: 11,
        fontWeight: 'bold'
    },
    products: {
        marginLeft: widthToDP('6%'),
        width: widthToDP('88%'),
        height: heightToDP('65%'),
        marginTop: heightToDP('2%')
    },
    productButton: {
        width: 338,
        height: 113, 
        marginTop: 20,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0DEDE',
        borderRadius: 19,
        marginBottom: heightToDP('2%')

    },
    imgHb: {
        width: 135,
        height: 109,
        borderRadius: 18 
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -5
    },
    productDescription: {
        width:150,
        fontSize: 12,
        marginLeft: 16,
        marginTop: 2
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 100,
        marginTop: 4
    },  
    footer: {
        backgroundColor: 'white',
        width: widthToDP('100%'),
        height: widthToDP('13%'),
        marginTop: heightToDP('6%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconFooter: {
        marginLeft: widthToDP('6%'),
        width: widthToDP('18%'),
        height: heightToDP('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconHome: {
        width: 28,
        height: 27
    },
    iconFavoritos: {
        width: 20,
        height: 28
    },
    iconConta: {
        width: 20,
        height: 28
    },
    iconLocalizacao: {
        width: 21,
        height: 28
    }
});
