import { Text ,View, FlatList , useWindowDimensions , ActivityIndicator , Image  , Pressable} from "react-native";
import React, { useEffect, useState } from "react";
import apiGiveaway from "../../Services/apiGiveaway";
import style from "./style";
import { LinearGradient } from 'expo-linear-gradient';

const filterTypes = [
  {
    label : 'PC' , key :'pc'
  },
  {
    label : 'Xbox' , key :'pc'
  },
  {
    label : 'PS4' , key :'pc'
  },
  {
    label : 'Switch' , key :'pc'
  },
  {
    label : 'Mobile' , key :'pc'
  }
]



const handleNome = (nome) => {
  return (nome?.length > 30 ? nome.substring(0,30) + '...' : nome);
}

const createCards = (data,{navigation}) => {
    return(
          <Pressable style={{margin:10}} onPress={()=>navigation.navigate('GiveawayFocused',data.item)}>   
            <Image style = {{width:160,height:80,resizeMode:'stretch'}} source={{uri : data.item.thumbnail ?? '-'}}></Image>
            <View style={{overflow: 'hidden' }}>
              <LinearGradient style={{width:160,height:30,alignItems:'center',justifyContent:'center'}} colors={['#0784b5', 'rgba(5,147,132,1)', 'rgba(5,147,132,1)','rgba(1,33,91,1)']}>                 
                <Text style={{textAlign:'center',color:'white'}}>{handleNome(data.item.title) ?? '-'}</Text> 
              </LinearGradient>
            </View>
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
      columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , marginBottom : 10, justifyContent : 'center' }}
      data={resp}
      renderItem={(data)=>createCards(data,{navigation})}
      keyExtractor={item => item.id}
      numColumns={window.width > 600 ? 3 : 2}
      ListHeaderComponent = {header}
      contentContainerStyle={{paddingBottom:60,marginTop:60}} 
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
          <View style={{backgroundColor:'#192428',alignItems : 'center',marginBottom : '20%', height: '100%'}}>
            <MemoizedList resp={resp}  window = {window} navigation = {navigation}/>
           </View>
          ) : 
          (<View style={style.loadingView}><ActivityIndicator size={30} color="#0000ff" /></View>) 
        }
        </>
    )
}