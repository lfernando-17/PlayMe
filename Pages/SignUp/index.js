import React from 'react';
import {Text , Pressable , View , Alert , TextInput} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Localization from 'expo-localization';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const Input = ({placeholder , type , value , onChange , stylesInput }) => {
  return (
  <View style={styles.input}>
      <Ionicons name={placeholder =='Email'?'people-outline' : 'lock-closed-outline'} size={20} color={"black"} />
  <TextInput
      secureTextEntry={ placeholder !='Password' || placeholder != 'Confirm Password'? false : true}
      style={stylesInput}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      />
  </View>
  
  )
}

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


export default function SignUp({navigation}){

    const SignUp = async(email,password,confirmpassword,name,surname) => {
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

        if(password != confirmpassword) {
          Alert.alert(
            "Passwords doesn't mach !",
            "",
            [
              { text: "OK" }
            ]
          )
          return
        }
    
        let { user, error } = await supabase.auth.signUp({
            email: email,
            password: password
          },{
            data : {
              name : name,
              surname : surname,
              country : Localization.locale
            }
          }
          
          )
          if(error != null) {Alert.alert(
            error.message,
            "",
            [
              { text: "OK" }
            ]
          )
          return }
              navigation.navigate('SuccessPage',user)
          
    }

    const [email, setemail] = React.useState(null)
    const [password, setpassword] = React.useState(null)
    const [confirmpassword, setconfirmpassword] = React.useState(null)
    const [surname,setsurname] = React.useState(null)
    const [name,setname] = React.useState(null)
    return (
      <View style={{flex : 1 ,backgroundColor:'#059384'}}>
          <Pressable style={{marginHorizontal:10, marginTop:40}}onPress={()=>navigation.goBack()}>
            <Ionicons name={'chevron-back-outline'} size={30} color={"blue"} />
          </Pressable>

        <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{width:'90%',height:'90%',backgroundColor:'white',borderRadius : 40,alignItems:'center'}}>   
              <View style={{marginVertical:40}}>
                <Text>Sign Up !</Text>
              </View>
              <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                  <Text style={{textAlign:'center'}}>Name : </Text>
                  <Input placeholder = "Name" type = "default" value = 
                  {name} onChange={setname} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>
              <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                  <Text>Surname : </Text>
                  <Input placeholder = "Surname" type = "default" value = 
                  {surname} onChange={setsurname} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>
              <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                  <Text>Email : </Text>
                  <Input placeholder = "Email" type = "default" value = 
                  {email} onChange={setemail} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                  <Text>Password : </Text>
                  <Input placeholder = "Password" type = "default" value = 
                  {password} onChange={setpassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={{marginVertical:10,alignItems:'flex-start',width:'90%'}}>
                  <Text>Confirm Password : </Text>
                  <Input placeholder = "Confirm Password" type = "default" value = 
                  {confirmpassword} onChange={setconfirmpassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={{alignItems:'center',width:"90%",height:"90%"}}>
                <Pressable style={styles.pressableLogin} onPress={()=>SignUp(email,password,confirmpassword,name,surname)}>
                  <Text>Enter</Text>
                </Pressable>
              </View>

          </View>
        </View>
          
      </View>
    )
}