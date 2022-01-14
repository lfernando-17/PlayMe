import React, { useEffect, useState , useCallback } from "react";
import styles from './styles';
import { Text , View , Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from "@react-navigation/native";

export default function Profile({route , navigation}){

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
            <Text>Perfil Dados da sua Conta</Text>
            <Image  style={{width : 75,height : 75}} source={{uri :Profile.picture}}></Image>
            <Text>{Profile.name}</Text>

            <Ionicons name={mail-outline} size={30} color={"white"} />
            <Text>{Profile.email}</Text>

            <Ionicons name={person-outline} size={30} color={"white"} />
            <Text>Nome {Profile.given_name}</Text>

            <Ionicons name={information-circle-outline} size={30} color={"white"} />
            <Text>Sobrenome {Profile.family_name}</Text>
            
            <Ionicons name={location-outline} size={30} color={"white"} />
            <Text>Localidade do Perfil do Usuário : {Profile.locale}</Text>

            <Pressable onPress={()=>navigation.goBack()}>
                <Ionicons name={power} size={30} color={"white"} />
                <Text>Desconectar</Text>
            </Pressable>
        </View>
    )
}