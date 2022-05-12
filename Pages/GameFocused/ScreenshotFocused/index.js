import React from "react"
import {Text , SafeAreaView , Pressable , View} from "react-native"
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ScreenshotFocused({route,navigation}){
    var data = route.params;
    data = "https:"+data?.replace("t_thumb","t_original")
    const image = [{
        url : data
    }]
    return (
        <View style={{flex:1}}>
            <Pressable style={{alignItems:'flex-end',position:'absolute',top:59,right:28}}onPress={()=> navigation.goBack()}>
                <Ionicons name={'close-circle-outline'} size={30} color={'#1470d9'} />
            </Pressable>
            <ImageViewer style={{zIndex:-1}}saveToLocalByLongPress={false} renderIndicator={()=>{}} imageUrls={image}/>
        </View>     
    )
}