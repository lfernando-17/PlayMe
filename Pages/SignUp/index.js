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
  const [button,setButton] = React.useState(false)
  const [image, setImage] = React.useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  var imageAux = image;

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
      
      if(data != null){
        imageAux =`https://euuugeoixisfdpijuaea.supabase.in/storage/v1/object/public/${data.Key}`;
      };
      if (error != null) {
        Alert.alert(
          `There were problems with the camera ${error.message}!`,
          "",
          [
            { text: "OK" }
          ]
        )
        throw error.message
  }
}
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri)
      }
    }

  const signUp = async() => {
    setButton(true);
      if(email == null || password == null || name == null || surname == null){
          Alert.alert(
              "Attention",
              "There are fields missing !",
              [
                { text: "OK" }
              ]
            )
            setButton(false);
            return
      }

      if(password != confirmpassword) {
        Alert.alert(
          "Attention",
          "Passwords doesn't mach !",
          [
            { text: "OK" }
          ]
        )
        setButton(false);
        return
      }

      try {
        let { user, error } = await supabase.auth.signUp({
          email: email,
          password: password
        },{
          data : {
            name : name,
            surname : surname,
            country : Localization.locale,
            picture : image
          }
        }
        
        )
        if(error != null) {throw error}  
                
        await imageBucket(image)
        await supabase.auth.update({data:{picture: imageAux}})
        user.user_metadata.picture = imageAux
        navigation.navigate('SuccessPage',user) 
      } catch (error) {
        Alert.alert(
          "Attention",
          error.message,
          [
            { text: "OK" }
          ]
        )
        setButton(false);
        return
      }
      
  }

    return (

      <View style={styles.containerAll}>

          <Pressable style={styles.pressableImage}onPress={()=>navigation.goBack()}>
            <Ionicons name={'chevron-back-outline'} size={30} color={"blue"} />
          </Pressable>

          <View style={styles.containerHeader}>
                <Text style={styles.txtSignUp}>Sign Up !</Text>
                <Pressable style={{zIndex:-1}} onPress={pickImage}>
                    <Image  style={styles.imageProfile} source={{uri : image }}></Image>
                    <View style={{position: 'absolute',right: 10,top: 42}}>
                    <Ionicons  name={"pencil-sharp"} size={20} color={"black"} />
                    </View>
                    </Pressable>
          </View>
              
          <View style={styles.containerCard}>
          
          <View style={styles.card}>   

              <View style={styles.inputProfileInfo}>
                  <View style={styles.name}>
                      <Text style={{textAlign:'center'}}>Name : </Text>
                      <Input placeholder = "Name" type = "default" value = 
                      {name} onChange={setname} stylesInput={{marginLeft : 5,height:'100%',width:'40%'}}/>
                  </View>
                  <View style={styles.name}>
                      <Text>Surname : </Text>
                      <Input placeholder = "Surname" type = "default" value = 
                      {surname} onChange={setsurname} stylesInput={{marginLeft : 5,height:'100%',width:'40%'}}/>
                  </View>
              </View>

              <View style={styles.containerData}>
                  <Text>Email : </Text>
                  <Input placeholder = "Email" type = "default" value = 
                  {email} onChange={setemail} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={styles.containerData}>
                  <Text>Password : </Text>
                  <Input placeholder = "Password" type = "default" value = 
                  {password} onChange={setpassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={styles.containerData}>
                  <Text>Confirm Password : </Text>
                  <Input placeholder = "Confirm Password" type = "default" value = 
                  {confirmpassword} onChange={setconfirmpassword} stylesInput={{marginLeft : 5,height:'100%',width:'100%'}}/>
              </View>

              <View style={styles.containerEnter}>
                <Pressable disabled={button} style={styles.pressableLogin} onPress={()=>signUp()}>
                  <Text>Enter</Text>
                </Pressable>

              </View>

          </View>
        </View>
      </View>
    )
}