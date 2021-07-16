import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Register from "./Register";
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordHome from './ForgotPasswordHome';
import ForgotPasswordCode from './ForgotPasswordCode';
import CodeValidation from './CodeValidation';
import HomeDeliveryman from './HomeDeliveryman'
import DeliverymanStatus from './DeliverymanStatus';
import RegisterName from "./RegisterName";
import RegisterPhoneNumber from './RegisterPhoneNumber';
import RegisterPassword from './RegisterPassword';
import ProductCard from './ProductCard';
import RequestsDeliveryman from './RequestsDeliveryman';
import OrderCard from './OrderCard';
import OrderDetails from './OrderDetails';
import EditAccount from './EditAccount';
import EditName from './EditName';
import EditPassword from './EditPassword';
import EditPhone from './EditPhone';
import { TransitionSpecs } from '@react-navigation/stack';


const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                      cardStyle: {
                        opacity: progress.interpolate({
                          inputRange: [0, 0.5, 0.9, 1],
                          outputRange: [0, 0.25, 0.7, 1],
                        }),
                      },
                      overlayStyle: {
                        opacity: progress.interpolate({
                          inputRange: [0, 0.1],
                          outputRange: [0, 0.5],
                          extrapolate: 'clamp',
                        }),
                      },
                    }),
                  }}
                  mode="modal"
                >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="ProductCard" component={ProductCard}/>
                <Stack.Screen name="HomeDeliveryman" component={HomeDeliveryman}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="RegisterName" component={RegisterName}/>
                <Stack.Screen name="RegisterPhoneNumber" component={RegisterPhoneNumber}/>
                <Stack.Screen name="RegisterPassword" component={RegisterPassword}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="ForgotPasswordHome" component={ForgotPasswordHome}/>
                <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode}/>
                <Stack.Screen name="CodeValidation" component={CodeValidation}/>
                <Stack.Screen name="DeliverymanStatus" component={DeliverymanStatus}/>
                <Stack.Screen name="RequestsDeliveryman" component={RequestsDeliveryman}/>
                <Stack.Screen name="OrderCard" component={OrderCard}/>
                <Stack.Screen name="OrderDetails" component={OrderDetails}/>
                <Stack.Screen name="EditAccount" component={EditAccount}/>
                <Stack.Screen name="EditName" component={EditName}/>
                <Stack.Screen name="EditPassword" component={EditPassword}/>
                <Stack.Screen name="EditPhone" component={EditPhone}/>

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Routes;