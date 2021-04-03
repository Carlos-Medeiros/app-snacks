import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Register from "./Register";
import EmailValidator from './EmailValidator';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import CodeValidation from './CodeValidation';
import Choice from './Choice';
import HomeDeliveryman from './HomeDeliveryman'
import RegisterDeliveryman from './RegisterDeliveryman';


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
                <Stack.Screen name="HomeDeliveryman" component={HomeDeliveryman}/>
                <Stack.Screen name="Choice" component={Choice}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="RegisterDeliveryman" component={RegisterDeliveryman}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="CodeValidation" component={CodeValidation}/>
                <Stack.Screen name="EmailValidator" component={EmailValidator}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Routes;