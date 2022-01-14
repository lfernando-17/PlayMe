import React, { useEffect, useState , useCallback } from "react";
import api from '../../Services/api';
import styles from './style';
import { Text , View , TextInput, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input = ({placeholder , type , value , onChange , stylesInput}) => {
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

const Card = ({ logoName , color , size}) => {
    return (
        <Pressable style={styles.card(color)} onPress={()=>{}}>
                <View style ={styles.cardIcon}>
                    <Ionicons name={logoName} size={size} color={"white"} />
                </View>
            </Pressable>
    )
}

export default function Login({navigation}){
  const navigate = navigation
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
                        <Card  logoName = "logo-facebook" color = "#4267B2" size = {25} />
                        <Card  logoName = "logo-google" color = "#db3236" size = {25} />
                        <Card  logoName = "logo-twitter" color = "#1DA1F2" size = {25} />
                    </View>

                    <Pressable style = {styles.pressableLogin} onPress={()=>{navigate.navigate('Tabs')}}>  
                        <Text style={{fontSize:17}}>Sign in</Text>   
                    </Pressable>
                </View>
            </View>
        </View>
    )
}