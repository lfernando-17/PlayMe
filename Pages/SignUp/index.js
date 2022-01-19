import React from 'react';
import {Text , Pressable , View , Alert , TextInput , Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Localization from 'expo-localization';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'

const Input = ({placeholder , type , value , onChange , stylesInput }) => {
  return (
  <View style={styles.input}>
      <Ionicons name={placeholder =='Email'?'mail-outline' : (placeholder=='Name' ? 'person-circle-outline': (placeholder=='Surname'? 'people-circle-outline':'lock-closed-outline'))} size={20} color={"black"} />
  <TextInput
      placeholderTextColor={'#9c9c9c'}
      secureTextEntry={ placeholder =='Password' || placeholder == 'Confirm Password'? true : false}
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
  const [email, setemail] = React.useState(null)
  const [password, setpassword] = React.useState(null)
  const [confirmpassword, setconfirmpassword] = React.useState(null)
  const [surname,setsurname] = React.useState(null)
  const [name,setname] = React.useState(null)

  const [image, setImage] = React.useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

  const imageBucket = async(result)=>{
    const ext = result.substring(result.lastIndexOf(".") + 1);

      const fileName = result.replace(/^.*[\\\/]/,"1");

      var formData = new FormData();
      formData.append("files",{
        uri : result,
        name : fileName,
        type : result.type ? `image/${ext}` : `video/${ext}`
      })

      const { data, error } = await supabase.storage
      .from("image-bucket")
      .upload(fileName,formData)

      if(data){
        setImage("https://euuugeoixisfdpijuaea.supabase.in/storage/v1/object/public/"+data.Key)
      };
      if (error) {
        Alert.alert(
          "There were problems with the camera !",
          "",
          [
            { text: "OK" }
          ]
        )
  }
}
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
      setImage(result.uri)
    }
  }


    const signUp = async() => {
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
        imageBucket(image)
        let { user, error } = await supabase.auth.signUp({
            email: email,
            password: password
          },{
            data : {
              name : name,
              surname : surname,
              country : Localization,
              picture : image
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
          return 
        }
              navigation.navigate('SuccessPage',user)
          
    }

    return (

      <View style={{flex : 1 ,backgroundColor:'#059384'}}>
          <Pressable style={{marginHorizontal:10, marginTop:40}}onPress={()=>navigation.goBack()}>
            <Ionicons name={'chevron-back-outline'} size={30} color={"blue"} />
          </Pressable>
          <View style={{ zIndex:1,position:'absolute',marginTop:'20%',marginLeft:'30%',alignItems:'center',justifyContent:'flex-end'}}>
                <Text style={{color:'white',fontSize:25,fontWeight: 'bold'}}>Sign Up !</Text>
                <Pressable style={{zIndex:-1}}onPress={pickImage}>
                    <Image  style={{width : 100,height : 100 , marginTop:30,borderRadius:10,overflow: "hidden",borderWidth: 5,borderColor: "grey"}} source={{uri : image }}></Image>
                </Pressable>
              </View><View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}>
          
          <View style={{borderTopLeftRadius: 35 ,borderTopRightRadius : 35 ,backgroundColor:'white',height : '68%',width:'100%' ,alignItems:'center'}}>   

              <View style={{flexDirection:'row',width:'90%',marginLeft:5,marginTop:50}}>
                  <View style={{alignItems:'flex-start'}}>
                      <Text style={{textAlign:'center'}}>Name : </Text>
                      <Input placeholder = "Name" type = "default" value = 
                      {name} onChange={setname} stylesInput={{marginLeft : 5,height:'100%',width:'40%'}}/>
                  </View>
                  <View style={{alignItems:'flex-start'}}>
                      <Text>Surname : </Text>
                      <Input placeholder = "Surname" type = "default" value = 
                      {surname} onChange={setsurname} stylesInput={{marginLeft : 5,height:'100%',width:'40%'}}/>
                  </View>
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
                <Pressable style={styles.pressableLogin} onPress={()=>signUp()}>
                  <Text>Enter</Text>
                </Pressable>

              </View>

          </View>
        </View>
      </View>
    )
}