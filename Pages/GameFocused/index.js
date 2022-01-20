import React from 'react';
import { SafeAreaView, View, Text, StatusBar ,  Image , useWindowDimensions, Pressable ,ActivityIndicator, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import apiGames from '../../Services/apiGames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './style';


export default function GameFocused({route , navigation}) {

  const [loading,setLoading] = React.useState(false);
  const window = useWindowDimensions();
  const data = route.params;

  const getSimilarGameInfo =async (id) => {
    let link = "/games";
    let fields = "fields similar_games.name,release_dates.human,similar_games.cover.url,name,cover.url,summary,rating,genres.name,platforms.name,screenshots.url;sort created_at desc;where cover != null & rating != null & genres !=null & release_dates != null & similar_games.cover.url != null & similar_games.cover != null & id = "+id+";";
    await apiGames
    .post(link, fields,
    {
      headers: {
          'Client-ID': 'f7wh9fp8o60qav6ym4znqy8hp4s6h1',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer emcopxz4lpds5uy8w7uq44f7cgjaqm' 
      }
    })
    .then((response) => {
      navigation.replace('GameFocused',response.data[0]);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }
  const LoadingView = ()=>{
    return (
      <View style={{position: "absolute",left: 0,right: 0,top: 0,bottom: 0,opacity: 0.7,backgroundColor: "black",justifyContent: "center",alignItems: "center",}}>
          <ActivityIndicator size="small" color="#FFD700"/>
      </View>
      )
  }
  const similarGames = (data,window,getGameInfo) => {
    return (
          <View style={{alignItems: 'center', justifyContent: 'center',width: (window.width > 600 ? 180 : 160) , marginLeft : 20}}>
            <Pressable onPress={()=>
                getGameInfo(data.item.id)
              }>
              <Text style={{marginBottom : 5,textAlign:'center'}}>{data.item.name}</Text>
              <Image  style={style.similarGames(window)} source={{uri : "https:"+(data.item.cover?.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image> 
            </Pressable>
          </View>
    )
  }

const renderScreenshot = (data,window) => {
  return (
    <View style ={{backgroundColor : '#070621' , height :(window.width > 600 ? 200 : 200) , justifyContent : 'center'}}>
      <Image onLoadStart = {()=>setLoading(true)} onLoadEnd={()=>setLoading(false)} style={style.screenshots(window)} source={{uri : "https:"+(data.item.url.replace("t_thumb","t_original") ?? '-')}}/>
      {loading && <LoadingView/>}
      </View>
  )
}

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          
          <View style = {style.containerLeave(window)}>
            <Pressable onPress={()=> navigation.goBack()}>
                <Ionicons name={'close-circle-outline'} size={30} color={'#1470d9'} />
              </Pressable> 
            
          </View>
          <View style={{flexDirection:'row'}}>

            <Image  style={style.Logo(window)} source={{uri : "https:"+(data.cover?.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image>  
            
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
              renderItem={(data)=>similarGames(data,window,getSimilarGameInfo)}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}






