import React from 'react';
import { SafeAreaView, View, Text, StatusBar ,  Image , useWindowDimensions, Pressable , FlatList} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './style';

const similarGames = (data,window) => {
  return (
        <View style={{alignItems: 'center', justifyContent: 'center',width: (window.width > 600 ? 180 : 160) , marginLeft : 20}}>
          <Text style={{marginBottom : 5,textAlign:'center'}}>{data.item.name}</Text>
          <Image  style={style.similarGames(window)} source={{uri : "https:"+(data.item.cover.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image> 
        </View>
  )
}

const renderScreenshot = (data,window) => {
  return (
    <View style ={{backgroundColor : '#070621' , height :(window.width > 600 ? 200 : 200) , justifyContent : 'center'}}>
      <Image  style={style.screenshots(window)} source={{uri : "https:"+(data.item.url.replace("t_thumb","t_cover_big") ?? '-')}}/>
      </View>
  )
}

export default function GameFocused({route , navigation}) {
  const window = useWindowDimensions();
  const data = route.params;
  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        
        <View style = {style.containerLeave(window)}>
          <Pressable onPress={()=> navigation.goBack()}>
              <Ionicons name={'close-circle-outline'} size={30} color={'#1526bd'} />
            </Pressable> 
          
        </View>
        <View style={{flexDirection:'row'}}>

          <Image  style={style.Logo(window)} source={{uri : "https:"+(data.cover.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image>  
          
          <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <Text style={{ textAlign: 'center',}}>{data.name}</Text>
          </View>
        </View>
        
        
          <Text style ={{textAlign:'center',margin : 20}}>{data.summary}</Text>
        

        <FlatList
          style={{flexGrow: 0}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.screenshots}
          renderItem={(data)=>renderScreenshot(data,window)}
          keyExtractor={(item, index) => String(index)}
          />

          <Text style= {{margin : 20}}>Similar Games : </Text>

          <FlatList
            style={{flexGrow: 0}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.similar_games}
            renderItem={(data)=>similarGames(data,window)}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
    </SafeAreaView>
  );
}





