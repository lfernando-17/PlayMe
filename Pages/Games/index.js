import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Pressable , Image , useWindowDimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import apiGames from '../../Services/apiGames';
import styles from './style';
import ProgressCircle from 'react-native-progress-circle'

const MemoizedList = React.memo(({resp,createCard,window}) => {
  return (
    <FlatList
    contentContainerStyle={{right:5}}
    showsVerticalScrollIndicator={false}
    data={resp}
    renderItem={(data)=>createCard(data,window)}
    keyExtractor={(item, index) => String(index)}
    // onEndReached={() => {
    //   reachEnd("https://api.rawg.io/api/games?key=b6723e46a5c84afda3cc7ff1d38b461a&page="+(pagina++)+"&page_size=12");
    // }}
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
  return (nome?.length > 14 ? nome.substring(0,10) + '...' : nome);
}

const createCards = (data,window) => {
  return(
      <Pressable style = {styles.card(window)}  onPress={()=>{}}>
        <View style = {styles.containerOfAllCard}> 
          <View style = {styles.containerIcon(window)}>
            <Image  style={styles.tinyLogo(window)} source={{uri : "https:"+(data.item.cover.url.replace("t_thumb","t_cover_big") ?? '-')}}></Image></View> 
          <View style = {styles.containerContenty}>  
            <Text  style = {styles.GameTitle}>{data.item.name ?? '-'}</Text> 
              <ProgressCircle
              percent={data.item.rating}
              radius={window.width > 600 ? 50 : 25 }
              borderWidth={8}
              color={data.item.rating > 80 ? ("#0bc908") : (data.item.rating > 50 ? "#cfde00" : "#e32609") }
              shadowColor="#999"
              bgColor="#fff"
              >
                <Text style={{ fontSize: 18 }}>{parseInt(data.item.rating)}</Text>
              </ProgressCircle>
          </View>
        </View> 
      </Pressable>
  )
}

export default function Games() {

  const [resp, setResp] = React.useState([]);
  const window = useWindowDimensions();

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
    requestAPI("/games","fields name,cover.url,summary,rating;sort created_at desc;limit 3;where cover != null;where rating != null;", setResp)
  }, [])

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MemoizedList resp={resp} createCard = {createCards}  window = {window} />
      </View>
    </SafeAreaView>
  );
}


