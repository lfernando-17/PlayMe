import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Pressable , Image , useWindowDimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import apiGames from '../../Services/apiGames';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import Stars from 'react-native-stars';
import { LinearGradient } from 'expo-linear-gradient';

const MemoizedList = React.memo(({resp,createCard,window,navigation,offset,setOffSet}) => {
  return (
    <FlatList
    removeClippedSubviews = {true}
    initialNumToRender = {3}
    maxToRenderPerBatch = {3}
    showsVerticalScrollIndicator={false}
    data={resp}
    renderItem={(data)=>createCard(data,window,{navigation})}
    keyExtractor={(item, index) => String(index)}
    onEndReached={() => {
      setOffSet(offset+3);
      }}
    />
  )
}, (prevProps, nextProps) => {
  if (prevProps.resp === nextProps.resp) {
      return true; // props are equal
  } else {
      return false; // props are not equal -> update the component
  }
})

const footer = () => {
  return(
    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', margin: 10}}>
      <ActivityIndicator size="medium" color="#0000ff" />
    </View>
  )
}

const handleNome = (nome) => {
  return (nome?.length > 14 ? nome.substring(0,16) + '...' : nome);
}

const createCards = (data,window,{navigation}) => {
  return(
    <View style={{flexDirection:'row',alignItems:'center', marginVertical: 30, paddingHorizontal: 10}}>
      <View style = {styles.containerIcon(window)}>
            <Image  style={styles.tinyLogo(window)} source={{uri : "https:"+(data.item.cover.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image>
        </View> 

        <LinearGradient colors={['#0784b5', 'rgba(5,147,132,1)', 'rgba(5,147,132,1)','rgba(1,33,91,1)']}  style = {styles.card(window)}>
          <Pressable  onPress={()=>navigation.navigate('GameFocused',data.item)}>
          <View style = {styles.containerContenty}>
            <View style = {styles.containerOfAllCard}>   
              <Text  style = {styles.GameTitle}>{handleNome(data.item.name ?? '-')}</Text>
                <Text  style = {styles.Genres}>Genre : {data.item.genres.map((item,index,data) => { return( index + 1 === data.length ? item.name : item.name+ ", " )}) ?? ' - '}</Text>
                <Text  style = {styles.Genres}>Release Date : {data.item.release_dates[0].human ?? '-'}</Text>  
            </View>
            <View style={{alignItems:'center'}}>
            <Stars
              display={data.item.rating / 20 ?? '0'}
              spacing={8}
              count={5}
              starSize={40}
              fullStar= {<Ionicons name={'star'} size={15} color={"black"} />}
              emptyStar= {<Ionicons name={'star-outline'} size={15} color={"black"} />}
              halfStar={<Ionicons name={'star-half-outline'} size={15} color={"black"} />}/>
              
        </View>
          </View> 
        </Pressable>
      </LinearGradient>
    </View>
    
      
  )
}

export default function Games({navigation}) {
  const [resp, setResp] = React.useState([]);
  const window = useWindowDimensions();
  const [skip,setSkip] = React.useState(0);
  const [loading,setLoading] = React.useState(false);
  const [valueLabelQuery, setValueLabelQuery] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => 
    {
      setLoading(false)
      setValueLabelQuery(query)
      setSearchQuery(query)
    };

  const requestAPI = async (link,fields,state) => {
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
      state(response.data);
      setLoading(true)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  React.useEffect(() => {
    let query = searchQuery != '' ?  ';search"'+searchQuery+'";' : ";sort created_at desc;";
    requestAPI("/games","fields similar_games.name,release_dates.human,similar_games.cover.url,name,cover.url,summary,rating,genres.name,platforms.name,screenshots.url;limit "+(skip+3)+";where cover != null & rating != null & genres !=null & release_dates != null"+query, setResp)
  }, [skip,searchQuery])

  return (
      <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center',backgroundColor:'#192428'}}>
        <Searchbar
                style = {{width:window.width/1.2 , borderRadius : 20 , marginBottom : 30 , marginTop : 30}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                onSubmitEditing = {() => {
                  setSearchQuery(valueLabelQuery),setLoading(!loading)}}
                onIconPress = {() => {
                  setSearchQuery(valueLabelQuery),setLoading(!loading)}}
                value={valueLabelQuery}
              />
      {loading ?
        (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
          <MemoizedList setOffSet = {setSkip} offset = {skip} request = {requestAPI} setResp={setResp} resp={resp} createCard = {createCards}  window = {window} navigation = {navigation} />
        </View>
        )
      :
        footer()
      }
        </SafeAreaView>
  );
}


