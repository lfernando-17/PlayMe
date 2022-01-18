import React from 'react';
import {Text , View , Pressable } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SuccessPage({navigation,route}){
    const user = route.params;
    
    const profile = {
        email : user.email ?? "",
        family_name : user.user_metadata.surname ?? "",
        given_name : user.user_metadata.name ?? "",
        locale : user.user_metadata.country ?? "",
        name : user.user_metadata.name ?? "" +  user.user_metadata.surname ?? "",
        picture : user.user_metadata.picture ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{marginBottom:30,fontSize:25}}>Success!</Text>
            <Text style ={{marginBottom : 30}}>Your account has been created</Text>
            <Ionicons name={'checkmark-circle-outline'} size={150} color={"#08d4c4"} />

            <Pressable style = {{alignItems:'center',justifyContent:'center',borderRadius:10,marginVertical : 30 , backgroundColor:'#08d4c4',width:'30%',height:'5%'}}onPress={()=>navigation.navigate("Tabs",{resp : profile,wayIn : "supabase"})}>
                <Text>Continue</Text>
            </Pressable>
        </View>
    )

}