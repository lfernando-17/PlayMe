import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Pressable , Image , useWindowDimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import apiGames from '../../Services/apiGames';
import styles from './style';
import ProgressCircle from 'react-native-progress-circle'

const MemoizedList = React.memo(({resp,createCard,window,navigation,offset,setOffSet}) => {
  return (
    <FlatList
    removeClippedSubviews = {true}
    initialNumToRender = {3}
    maxToRenderPerBatch = {3}
    contentContainerStyle={{right:5}}
    showsVerticalScrollIndicator={false}
    data={resp}
    renderItem={(data)=>createCard(data,window,{navigation})}
    keyExtractor={(item, index) => String(index)}
    onEndReached={() => {
      setOffSet(offset+3);
      }}
    ListFooterComponent={footer}
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10}}>
      <ActivityIndicator size="medium" color="#0000ff" />
    </View>
  )
}

const handleNome = (nome) => {
  return (nome?.length > 14 ? nome.substring(0,16) + '...' : nome);
}

const createCards = (data,window,{navigation}) => {
  return(
      <Pressable style = {styles.card(window)}  onPress={()=>{}}>
        <View style={styles.containerRating(window)}>
        <ProgressCircle
              percent={data.item.rating ?? '0'}
              radius={window.width > 600 ? 40 : 20 }
              borderWidth={8}
              color={data.item.rating > 80 ? ("#0bc908") : (data.item.rating > 50 ? "#cfde00" : "#e32609") }
              shadowColor="#999"
              bgColor="#fff"
              >
                <Text style={window.width > 600 ? 20 : 10 }>{parseInt(data.item.rating ?? '')}</Text>
              </ProgressCircle>
          </View>
        <View style = {styles.containerOfAllCard}> 
          <View style = {styles.containerIcon(window)}>
            <Image  style={styles.tinyLogo(window)} source={{uri : "https:"+(data.item.cover.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image></View> 
          <View style = {styles.containerContenty}>  
            <Text  style = {styles.GameTitle}>{handleNome(data.item.name ?? '-')}</Text>
            <Pressable style = {styles.button}  onPress={()=> navigation.navigate('GameFocused',data.item)}>
              <Text style={{color: '#1470d9'}}>More Info</Text>
            </Pressable>
              <Text  style = {styles.Genres}>Genre : {data.item.genres.map((item,index,data) => { return( index + 1 === data.length ? item.name : item.name+ ", " )}) ?? ' - '}</Text>
              <Text  style = {styles.Genres}>Release Date : {data.item.release_dates[0].human ?? '-'}</Text>  
              </View>
        </View> 
      </Pressable>
  )
}

export default function Games({navigation}) {
  const [resp, setResp] = React.useState([]);
  const window = useWindowDimensions();
  const [skip,setSkip] = React.useState(0);
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
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  React.useEffect(() => {
    requestAPI("/games","fields similar_games.name,release_dates.human,similar_games.cover.url,name,cover.url,summary,rating,genres.name,platforms.name,screenshots.url;sort created_at desc;limit "+(skip+3)+";where cover != null & rating != null & genres !=null & release_dates != null & similar_games.cover.url != null;", setResp)
  }, [skip])

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MemoizedList setOffSet = {setSkip} offset = {skip} request = {requestAPI} setResp={setResp} resp={resp} createCard = {createCards}  window = {window} navigation = {navigation} />
      </View>
    </SafeAreaView>
  );
}


