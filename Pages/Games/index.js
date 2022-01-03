import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Pressable , Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import apiGames from '../../Services/apiGames';
import style from './style';

let pagina = 1;

const MemoizedList = React.memo(({resp,createCard,reachEnd}) => {

  return (
    <FlatList
    data={resp}
    renderItem={createCard}
    keyExtractor={item => item.id}
    numColumns={3}
    onEndReached={() => {
      reachEnd("https://api.rawg.io/api/games?key=b6723e46a5c84afda3cc7ff1d38b461a&page="+pagina++);
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
  return (nome?.length > 14 ? nome.substring(0,10) + '...' : nome);
}

const createCards = (data) => {
  return(
      <Pressable style = {style.card}  onPress={()=>{}}>   
        <Image  style = {style.tinyLogo} source={{uri : data.item.background_image ?? '-'}}></Image>
        <Text  style = {style.GameTitle}>{handleNome(data.item.name) ?? '-'}</Text> 
      </Pressable>
  )
}

export default function Games() {

  const [resp, setResp] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const requestAPI = async (link) => {
    await apiGames
    .get(link)
    .then((response) => {setResp([...resp, ...response.data.results]);})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  React.useEffect(() => {
    requestAPI("/games?key=b6723e46a5c84afda3cc7ff1d38b461a");
  }, [])

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      {loading ? 
        (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <MemoizedList resp={resp} createCard = {createCards} reachEnd={requestAPI}/>
          </View>
        )
          : 
        (
          <>
            <Text>teste</Text>
          </>
        )
      }
    </SafeAreaView>
  );
}


