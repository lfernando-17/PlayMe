import Home from "../Pages/Home";
import Games from "../Pages/Games";
import React from "react";
import GameFocused from "../Pages/GameFocused";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes(){

function Tabs () { 
  return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Offers') {
          iconName = focused ? 'basket' : 'basket-outline';
        } 
         else if (route.name === 'Games') {
           iconName = focused ? 'game-controller' : 'game-controller-outline';
         }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Offers" component={Home} />
    <Tab.Screen name="Games" component={Games} /> 
    </Tab.Navigator>)
}
    return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ modalPresentationStyle: 'fullScreen' , headerShown: false  }}>
            <Stack.Screen name="Tabs" component={Tabs}/>
            <Stack.Screen name="GameFocused" component={GameFocused}/>
          </Stack.Navigator>
    </NavigationContainer>
    )
}