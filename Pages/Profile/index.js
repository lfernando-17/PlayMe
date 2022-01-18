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
                const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${route.params.resp.params.access_token}`)
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
        <View style={{flex:1 , alignItems:'center',justifyContent:'center'}}>

            <View style ={{width:'100%', marginLeft:30}}>
                <Text style={{fontSize:28}}>Perfil</Text>
                <Text>Dados da sua conta</Text>
            </View>
            
            <Image  style={{width : 100,height : 100 , marginTop:60,borderRadius:10,overflow: "hidden",borderWidth: 5,borderColor: "#059384"}} source={{uri :wayIn !="supabase" ? Profile.picture :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}></Image>
            <Text style={{marginTop:20,fontSize:30}}>{Profile.name}</Text>
            
            <View style={{flexDirection:'row' , alignItems:'center',justifyContent:'center' , marginTop:5}}>
                <Ionicons name={'mail-outline'} size={15} color={"black"} />
                <Text style={{marginLeft:5}}>{Profile.email}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:60,width:'100%'}}>

                <View style={{alignItems:'center',justifyContent:'space-evenly'}}>
                    <Ionicons name={'person-outline'} size={30} color={"black"} />
                    <Text style={{fontSize:12}}>Nome</Text>
                    <Text style={{fontSize:25}}>{Profile.given_name}</Text>
                </View>

                <View style={{alignItems:'center',justifyContent:'space-evenly'}}>
                    <Ionicons name={'information-circle-outline'} size={30} color={"black"} />
                    <Text style={{fontSize:12}}>Sobrenome</Text>
                    <Text style={{fontSize:25}}>{Profile.family_name}</Text>
                </View>
            </View>
            
            <View style={{flexDirection:'row',alignItems:'center',marginTop:50}}>
                <Ionicons name={'location-outline'} size={30} color={"black"} />
                <Text>Localidade do Perfil do Usuário : {Profile.locale}</Text>
            </View>
            
            <View style={{flexDirection:'row',marginTop:30}}>
                <Pressable style={{flexDirection:'row',alignItems:'center'}} onPress={()=>navigation.navigate("Login")}>
                    <Ionicons name={'power'} size={30} color={"black"} />
                    <Text style={{marginLeft:4}}>Desconectar</Text>
                </Pressable>
            </View>
        </View>
    )
}