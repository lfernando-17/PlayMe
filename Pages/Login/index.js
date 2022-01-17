import React, { useEffect, useState , useCallback } from "react";
import styles from './style';
import { Text , View , TextInput, Pressable , Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const supabaseUrl = 'https://euuugeoixisfdpijuaea.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
    localStorage: AsyncStorage ,
    detectSessionInUrl: false,
    // autoRefreshToken: true,
    // persistSession: true
    // url: string,
    // headers?: { [key: string]: string },
    });

const Input = ({placeholder , type , value , onChange , stylesInput }) => {
    return (
    <View style={styles.input}>
        <Ionicons name={placeholder =='Username'?'people-outline' : 'lock-closed-outline'} size={20} color={"black"} />
    <TextInput
        secureTextEntry={ placeholder =='Username'? false : true}
        style={stylesInput}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        keyboardType={type}
        />
    </View>
    
    )
}

const Card = ({ logoName , color , size , handleSignIn }) => {
    return (
        <Pressable style={[styles.card,{backgroundColor : color}]} onPress={handleSignIn}>
                <View style ={styles.cardIcon}>
                    <Ionicons name={logoName} size={size} color={"white"} />
                </View>
            </Pressable>
    )
}

export default function Login({navigation}){

const handleSignIn = async () =>{

    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const response = await AuthSession.startAsync({ authUrl })
    if (response?.type =="success" ){navigation.navigate('Tabs',{resp : response, wayIn : "google"})}

}

const loginAPI = async(email , password) =>{
    if(email == null || password == null){
        Alert.alert(
            "There are fields missing !",
            "",
            [
              { text: "OK" }
            ]
          )
          return
    }

    let { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
      })
      
      if(error != null) {Alert.alert(
          error.message,
          "",
          [
            { text: "OK" }
          ]
        )
        return }

        const profile = {
            email : user.email ?? "",
            family_name : user.user_metadata.surname ?? "",
            given_name : user.user_metadata.name ?? "",
            locale : user.user_metadata.country ?? "",
            name : (user.user_metadata.name + user.user_metadata.surname ) ?? ""
        }
        navigation.navigate('Tabs',{resp : profile, wayIn:"supabase"})
}

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
    return (
        <View style ={styles.containerAll}>
            <View style = {styles.containerWelcome}> 
                <Text style={styles.txtWelcome}>Welcome !</Text>
            </View>
            <View style ={styles.containerLogin}>
                <View style = {styles.login}>

                    <View style = {styles.containerInputs}>
                        <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>    
                            <Text>Email : </Text>
                            <Input placeholder = "Username" type = "default" value = 
                            {user} onChange={setUser} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
                        </View>
                        <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                            <Text>Password : </Text>
                            <Input placeholder = "Password" type = "default" value = 
                            {password} onChange={setPassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
                        </View>
                    </View>

                    <View style={styles.containerCards}>
                        <Card  logoName = "logo-facebook" color = "#4267B2" size = {25}  handleSignIn={handleSignIn} />
                        <Card  logoName = "logo-google" color = "#db3236" size = {25}  handleSignIn={handleSignIn} />
                        <Card  logoName = "logo-twitter" color = "#1DA1F2" size = {25}  handleSignIn={handleSignIn}/>
                    </View>

                    <Pressable style = {styles.pressableLogin} onPress={()=>loginAPI(user,password)}>  
                        <Text style={{fontSize:17}}>Sign in</Text>   
                    </Pressable>

                    <Pressable onPress={()=>navigation.navigate('SignUp')}>  
                        <Text style={{fontSize:12,color:'blue'}}>New ? Create an account !</Text>   
                    </Pressable>
                </View>
            </View>
        </View>
    )
}