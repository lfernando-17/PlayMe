import React, { useEffect, useState , useCallback } from "react";
import styles from './styles';
import { Text , View , Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from "@react-navigation/native";

export default function Profile({route}){

    const [Profile, setProfile] = useState({})

    async function loadProfile(){
        const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${route.params.params.access_token}`)
        const userInfo = await response.json()
        setProfile(userInfo);
        // "email": "luizfernandoleal39@gmail.com",
        // "family_name": "Faltando",
        // "given_name": "Dedo",
        // "id": "105830042571964123375",
        // "locale": "pt-BR",
        // "name": "Dedo Faltando",
        // "picture": "https://lh3.googleusercontent.com/a-/AOh14GiUsSeloKFVH59rEoWbDNJIeLy6-hIIIuhx5_P7Lg=s96-c",
        // "verified_email": true,
    }

    useEffect(() => {
        loadProfile()
    }, [])

    return (
        <View style={{flex:1 , alignItems:'center',justifyContent:'center'}}>
             <Image  style={{width : 75,height : 75}} source={{uri :Profile.picture}}></Image>
            <Text>Bem Vindo ! {Profile.name}</Text>
            <Text>Email :   {Profile.email}</Text>
        </View>
    )
}