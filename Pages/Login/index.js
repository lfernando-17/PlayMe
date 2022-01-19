import React, { useEffect, useState , useCallback } from "react";
import styles from './style';
import { Text , View , TextInput, Pressable , Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';
import * as Facebook from "expo-facebook";
import * as Localization from 'expo-localization';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { FACEBOOK_APP_ID } = process.env

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
        placeholderTextColor={'#9c9c9c'}
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
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [button,setButton] = useState(false);

const signUpFacebook = async () => {
    try {
        await Facebook.initializeAsync({
            appId: FACEBOOK_APP_ID,
          });
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email","user_location"],
        });
        if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            `https://graph.facebook.com/me?fields=id,name,first_name,location,last_name,picture.type(large),email&access_token=${token}`
        );
        // console.log((await response.json()).name);
        const data = await response.json();
        const profile = {
            email : data.email ?? "",
            family_name : data.last_name ?? "",
            given_name : data.first_name ?? "",
            picture : data.picture.data.url ?? "",
            locale : data.location ?? Localization.locale,
            name : data.name ?? ""
        }
        if(data){ navigation.navigate("Tabs",{resp : profile,wayIn:"facebook"}) }
        } else {
        // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
    };

const handleSignIn = async () =>{

    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const response = await AuthSession.startAsync({ authUrl })
    if (response?.type =="success" ){navigation.navigate('Tabs',{resp : response, wayIn : "google"})}

}

const loginAPI = async(email , password) =>{
    setButton(true)
    if(email == null || password == null){
        Alert.alert(
            "Attention",
            "There are fields missing !",
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
          "Attention",
          error.message,
          [
            { text: "OK" }
          ]
        )
        setButton(false);
        return }
        
        const profile = {
            email : user.email ?? "",
            family_name : user.user_metadata.surname ?? "",
            given_name : user.user_metadata.name ?? "",
            locale : user.user_metadata.country ?? "",
            name : (user.user_metadata.name + user.user_metadata.surname ) ?? "" ,
            picture : user.user_metadata.picture
        }
        navigation.navigate('Tabs',{resp : profile, wayIn:"supabase"})
}

 return (
        <View style ={styles.containerAll}>
            <View style = {styles.containerWelcome}> 
                <Text style={styles.txtWelcome}>Look up and Play Me !</Text>
                <Text style={{color:'white' , fontSize:15 , marginTop : 10}}>Discover new games to play </Text>
            </View>
            <View style ={styles.containerLogin}>
                <View style = {styles.login}>

                    <View style = {styles.containerInputs}>
                        <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>    
                            <Text>Email : </Text>
                            <Input placeholder = "Username" type = "default" value = 
                            {username} onChange={setUsername} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
                        </View>
                        <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                            <Text>Password : </Text>
                            <Input placeholder = "Password" type = "default" value = 
                            {password} onChange={setPassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
                        </View>
                    </View>

                    <View style={styles.containerCards}>
                        <Card  logoName = "logo-facebook" color = "#4267B2" size = {25}  handleSignIn={signUpFacebook} />
                        <Card  logoName = "logo-google" color = "#db3236" size = {25}  handleSignIn={handleSignIn} />
                        {/* <Card  logoName = "logo-twitter" color = "#1DA1F2" size = {25}  handleSignIn={signUpTwitter}/> */}
                    </View>

                    <Pressable disable = {button} style = {styles.pressableLogin} onPress={()=>loginAPI(username,password)}>  
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