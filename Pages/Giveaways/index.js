import { Text ,View, FlatList , useWindowDimensions , ActivityIndicator , Image  , Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import apiGiveaway from "../../Services/apiGiveaway";
import style from "./style";

    const handleNome = (nome) => {
      return (nome?.length > 30 ? nome.substring(0,30) + '...' : nome);
    }

const createCards = (data,{navigation}) => {
    return( 
        <Pressable style={style.card} onPress={()=>navigation.navigate('GiveawayFocused',data.item)}>   
          <Image style = {style.tinyLogo} source={{uri : data.item.thumbnail ?? '-'}}></Image>
          <Text style={{textAlign:'center'}}>{handleNome(data.item.title) ?? '-'}</Text> 
          <Text  style = {style.SalesPrice}> Free </Text>  
          <Text  style = {style.NormalPrice}>{data.item.worth ?? '-'}</Text>
        </Pressable>
    )
  }

const MemoizedList = React.memo(({resp,header,window,navigation}) => {
    return (
      <FlatList
      removeClippedSubviews = {true}
      initialNumToRender = {9}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch = {9}
      columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , marginBottom : 10 , justifyContent : 'center' }}
      data={resp}
      renderItem={(data)=>createCards(data,{navigation})}
      keyExtractor={item => item.id}
      numColumns={window.width > 600 ? 3 : 2}
      ListHeaderComponent = {header}
      />
    )
  }, (prevProps, nextProps) => {
    if (prevProps.resp === nextProps.resp) {
        return true; // props are equal
    } else {
        return false; // props are not equal -> update the component
    }
  })



export default function Giveaways({navigation}){
    const [resp , setResp] = useState([]);
    const [loading, setLoading] = useState(false);

    const window = useWindowDimensions();

  useEffect(async () => {
    await apiGiveaway
      .get("/giveaways")
      .then((response) => {setResp(response.data) ; setLoading(true)})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

    return (
        <>
        {loading ? (
          <View style={{backgroundColor:'#E9E9E9',alignItems : 'center',marginBottom : '20%', height: '100%'}}>
            <MemoizedList resp={resp}  window = {window} navigation = {navigation}/>
           </View>
          ) : 
          (<View style={style.loadingView}><ActivityIndicator size={60} color={"#424242"} /></View>) 
        }
        </>
    )
}