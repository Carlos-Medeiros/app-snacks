import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Register from "./Register";
import EmailValidator from './EmailValidator';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordHome from './ForgotPasswordHome';
import ForgotPasswordCode from './ForgotPasswordCode';
import CodeValidation from './CodeValidation';
import Choice from './Choice';
import HomeDeliveryman from './HomeDeliveryman'
import DeliverymanStatus from './DeliverymanStatus';
import RegisterName from "./RegisterName";
import ValidationComplete from "./ValidationComplete";
import RegisterPhoneNumber from './RegisterPhoneNumber';
import RegisterPassword from './RegisterPassword';
import ProductCard from './ProductCard';
import Category from './Category';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#FFF'
                    }
                }}                     
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Category" component={Category}/>
                <Stack.Screen name="ProductCard" component={ProductCard}/>
                <Stack.Screen name="HomeDeliveryman" component={HomeDeliveryman}/>
                <Stack.Screen name="Choice" component={Choice}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="RegisterName" component={RegisterName}/>
                <Stack.Screen name="RegisterPhoneNumber" component={RegisterPhoneNumber}/>
                <Stack.Screen name="RegisterPassword" component={RegisterPassword}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="ForgotPasswordHome" component={ForgotPasswordHome}/>
                <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode}/>
                <Stack.Screen name="CodeValidation" component={CodeValidation}/>
                <Stack.Screen name="EmailValidator" component={EmailValidator}/>
                <Stack.Screen name="DeliverymanStatus" component={DeliverymanStatus}/>
                <Stack.Screen name="ValidationComplete" component={ValidationComplete}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Routes;