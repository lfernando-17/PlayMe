import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Pressable , Image , useWindowDimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import apiGames from '../../Services/apiGames';
import style from './style';

let pagina = 1;

const MemoizedList = React.memo(({resp,createCard,window}) => {
  console.log(resp)
  return (
    <FlatList
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
  // console.log(data);
  return(
      <Pressable style = {style(window).card}  onPress={()=>{}}> 
        <Text  style = {style.GameTitle}>{data.item.name ?? '-'}</Text>
        {/* <Image  style = {style.tinyLogo} source={{uri : cover[0]?.url ?? '-'}}></Image> */}
      </Pressable>
  )
}

export default function Games() {

  const [resp, setResp] = React.useState([]);
  const window = useWindowDimensions();

  const getCover = async (item) => {
    await apiGames
    .post("/covers", "fields url; where id="+item.cover+";",
    {
      headers: {
          'Client-ID': 'f7wh9fp8o60qav6ym4znqy8hp4s6h1',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer emcopxz4lpds5uy8w7uq44f7cgjaqm' 
      }
    })
    .then((response) => {
      item.background  = response.data[0].url;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }


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
    .then(async(response) => {
      for await (let item of response.data){
        Promise.all(getCover(item))
      }
      console.log(response.data)
      // state(response.data);
    //  response.data.forawait(getCover)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  React.useEffect(() => {
    requestAPI("/games","fields name,cover,summary;sort  rating;limit 3;where cover != null;", setResp)
  }, [])

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <MemoizedList resp={resp} createCard = {createCards}  window = {window} />
      </View>
    </SafeAreaView>
  );
}


