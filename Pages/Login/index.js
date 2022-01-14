import React, { useEffect, useState , useCallback } from "react";
import styles from './style';
import { Text , View , TextInput, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as AuthSession from 'expo-auth-session';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

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
    if (response?.type =="success" ){navigation.navigate('Tabs',response)}

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
                        <View style={{marginVertical:10}}>    
                            <Text>Username : </Text>
                            <Input placeholder = "Username" type = "default" value = 
                            {user} onChange={setUser} stylesInput={{marginLeft : 5}}/>
                        </View>
                        <View style={{marginVertical:10}}>
                            <Text>Password : </Text>
                            <Input placeholder = "Password" type = "default" value = 
                            {password} onChange={setPassword} stylesInput={{marginLeft : 5}}/>
                        </View>
                    </View>

                    <View style={styles.containerCards}>
                        <Card  logoName = "logo-facebook" color = "#4267B2" size = {25}  handleSignIn={handleSignIn} />
                        <Card  logoName = "logo-google" color = "#db3236" size = {25}  handleSignIn={handleSignIn} />
                        <Card  logoName = "logo-twitter" color = "#1DA1F2" size = {25}  handleSignIn={handleSignIn}/>
                    </View>

                    <Pressable style = {styles.pressableLogin} onPress={()=>{navigation.navigate('Tabs')}}>  
                        <Text style={{fontSize:17}}>Sign in</Text>   
                    </Pressable>
                </View>
            </View>
        </View>
    )
}