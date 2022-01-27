import React, { useEffect, useState , useCallback } from "react";
import styles from './styles';
import { Text , View , Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Google JSON : 
// "email": "luizfernandoleal39@gmail.com",
// "family_name": "Faltando",
// "given_name": "Dedo",
// "id": "105830042571964123375",
// "locale": "pt-BR",
// "name": "Dedo Faltando",
// "picture": "https://lh3.googleusercontent.com/a-/AOh14GiUsSeloKFVH59rEoWbDNJIeLy6-hIIIuhx5_P7Lg=s96-c",
// "verified_email": true,

export default function Profile({route , navigation}){
    const data = route.params.resp
    const wayIn = route.params.wayIn
    const [Profile, setProfile] = useState({})
    async function loadProfile(){
        switch (wayIn){
            case 'google' : 
                const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${route.params.resp.access_token}`)
                const userInfo = await response.json()
                setProfile(userInfo);
                break;
            default : 
                setProfile(data)
                break;  
        }
    }

    useEffect(() => {
        loadProfile()
    }, [])

    return (
        <View style={styles.containerAll}>

            <View style ={styles.containerProfileData}>
                <Text style={{fontSize:28}}>Perfil</Text>
                <Text>Dados da sua conta</Text>
            </View>
            
            <Image  style={styles.profileImage} source={{uri : Profile.picture}}></Image>
            <Text style={{marginTop:20,fontSize:30}}>{Profile.name}</Text>
            
            <View style={styles.profileEmail}>
                <Ionicons name={'mail-outline'} size={15} color={"black"} />
                <Text style={{marginLeft:5,color:'white'}}>{Profile.email}</Text>
            </View>

            <View style={styles.containerNameInfo}>

                <View style={styles.containerName}>
                    <Ionicons name={'person-outline'} size={30} color={"black"} />
                    <Text style={{fontSize:12,color:'white'}}>Nome</Text>
                    <Text style={{fontSize:25,color:'white'}}>{Profile.given_name}</Text>
                </View>

                <View style={styles.containerName}>
                    <Ionicons name={'information-circle-outline'} size={30} color={"black"} />
                    <Text style={{fontSize:12,color:'white'}}>Sobrenome</Text>
                    <Text style={{fontSize:25,color:'white'}}>{Profile.family_name}</Text>
                </View>
            </View>
            
            <View style={styles.containerLocale}>
                <Ionicons name={'location-outline'} size={30} color={"black"} />
                <Text style={{color:'white'}}>Localidade do Perfil do Usuário : {Profile.locale}</Text>
            </View>
            
            <View style={styles.containerButton}>
                <Pressable style={{flexDirection:'row',alignItems:'center'}} onPress={()=>{ navigation.navigate("Login")}}>
                    <Ionicons name={'power'} size={30} color={"black"} />
                    <Text style={{marginLeft:4,color:'white'}}>Desconectar</Text>
                </Pressable>
            </View>
        </View>
    )
}