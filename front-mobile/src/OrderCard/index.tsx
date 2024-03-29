import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {widthToDP, heightToDP} from '../Responsive';
import { Order } from '../types';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import realtiveTime from 'dayjs/plugin/relativeTime';

dayjs.locale('pt-br');
dayjs.extend(realtiveTime);

type Props = {
    order: Order;
}

function dateFromNow(date: string) {
    return dayjs(date).fromNow();
}


export default function OrderCard({ order }: Props) {

    return ( 
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.orderName}>Pedido {order.code}</Text>
                    <Text style={styles.orderPrice}>R$ {order.total}</Text>
                </View>
                <Text style={styles.text}>{dateFromNow(order.moment)}</Text>
                <View style={styles.productList}>
                    {order.products.map(product => (
                        <Text key={product.id} style={styles.text}>{product.name}</Text>
                    ))}
                </View>
                {}
                <View style={styles.productList}>
                    {order.paymantToCard? 
                        <Text style={styles.text}>Cartão</Text>
                    :
                        <Text style={styles.text}>Dinheiro</Text>
                    }
                    {order.change != null && order.change > 0? 
                        <Text style={styles.text}>Troco para R${order.change}</Text>
                    :
                    null}
                </View>
                <View style={styles.productList}>
                    <Text style={styles.text}>{order.details}</Text>
                </View>
            </View>               
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: heightToDP('2%'),
        marginBottom: heightToDP('2%'),
        marginRight: widthToDP('5%'),
        marginLeft: widthToDP('5%'),
        width: widthToDP('90%'),
        padding: 15,
        backgroundColor: '#191A1D',
        borderRadius: 10,
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowColor: '#121315',
        shadowOffset: { width: 0, height: 14 },
        elevation: 19

    },
    header: {
        width: widthToDP('82.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#FFDD00',
    },
    orderName: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#FFDD00',
    },
    orderPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'right',
        letterSpacing: -0.24,
        color: '#FFDD00'    
    },
    productList: {
        borderTopColor: '#FFDD00',
        borderTopWidth: 1,
        marginTop: 20,
        paddingTop: 15
    }
});
