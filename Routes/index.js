import Home from "../Pages/Home";
import Games from "../Pages/Games";
import Giveaways from "../Pages/Giveaways";
import GiveawayFocused from "../Pages/GiveawayFocused";
import SuccessPage from "../Pages/SuccessPage"
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import React from "react";
import GameFocused from "../Pages/GameFocused";
import Profile from "../Pages/Profile";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes(){

function Tabs ({route , navigation}) { 
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

         else if (route.name === 'Giveaways') {
          iconName = focused ? 'timer' : 'timer-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
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
    <Tab.Screen name="Giveaways" component={Giveaways} />
    <Tab.Screen name="Profile" children={()=><Profile navigation={navigation} route={route}/>}/>  
    </Tab.Navigator>)
}
    return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ modalPresentationStyle: 'fullScreen' , headerShown: false  }}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="SuccessPage" component={SuccessPage}/>
            <Stack.Screen name="Tabs" component={Tabs}/>
            <Stack.Screen name="GameFocused" component={GameFocused}/>
            <Stack.Screen name="GiveawayFocused" component={GiveawayFocused}/>
          </Stack.Navigator>
    </NavigationContainer>
    )
}