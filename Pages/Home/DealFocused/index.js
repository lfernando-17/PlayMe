import React , { useEffect, useState} from 'react'
import { View , Image , SafeAreaView ,Pressable, Text , Linking, StatusBar ,useWindowDimensions, ActivityIndicator , FlatList} from 'react-native';
import api from '../../../Services/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSupreme from '../ImageSupreme';
const url = "https://www.cheapshark.com/redirect?dealID=";

export default function DealFocused({route,navigation}){
    const window = useWindowDimensions();
    const gameID = route.params;
    const [loading,setLoading] = useState(false);
    const [response,setResp] = useState();
    const [stores,setStores] = useState();

    const createDealList = (deal) => {
            var store = stores?.find( store => store.storeID == deal.item.storeID)
        return (
            <Pressable onPress={()=>Linking.openURL(url+deal.item.dealID)} style={{margin:20,flexDirection:'row',width:window.width - 50,alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{resizeMode:'stretch',width:50,height:50,opacity:0.9}} source={{uri : "https://www.cheapshark.com/"+store?.images.logo }}></Image>
                    <Text style={{color:"white" , marginLeft:20}}>{store?.storeName}</Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <Text style={{color:'grey',marginBottom:5,fontSize:10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>{deal.item.retailPrice}</Text>
                    <Text style={{color:'rgba(5,147,132,1)',fontSize:17}}>{deal.item.price}</Text>
                </View>
 
            </Pressable>
        )
    }
    
    useEffect(async () => {
        await api
          .get("https://www.cheapshark.com/api/1.0/stores")
          .then((response) => {setStores(response.data) ;})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [gameID]);

    const MemoizedList = React.memo(() => {
        return (
          <FlatList
          removeClippedSubviews = {true}
          initialNumToRender = {9}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch = {9}
          data={response?.deals}
          renderItem={createDealList}
          keyExtractor={item => item.dealID}
          />
        )
      }, (prevProps, nextProps) => {
        if (prevProps.resp === nextProps.resp) {
            return true; // props are equal
        } else {
            return false; // props are not equal -> update the component
        }
      })
      
    const LoadingView = ()=>{
        return (
          <View style={{position: "absolute",left: 0,right: 0,top: 0,bottom: 0,opacity: 0.7,backgroundColor: "#192428",justifyContent: "center",alignItems: "center",}}>
              <ActivityIndicator size="small" color="#FFD700"/>
          </View>
          )
      }

    useEffect(async () => {
        await api
          .get(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`)
          .then((response) => {setResp(response.data) ;setLoading(true)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
    
    return ( 
        <SafeAreaView style={{flex:1,marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center',backgroundColor:'#192428'}}> 
            {!loading && <LoadingView/>}
                <View style={{width:'100%',height:253}} >
                    <Pressable style={{position:'absolute',top:10,right:5,zIndex:20}} onPress={()=> navigation.goBack()}>
                        <Ionicons name={'close-circle-outline'} size={30} color={'white'} />
                    </Pressable>
                    {response?.info.thumb !=  undefined ? <ImageSupreme style={{resizeMode:'stretch',width:400,height:223,opacity:0.9}} urlTrue={response?.info.thumb.replace("capsule_sm_120","capsule_616x353")} urlError={response?.info.thumb}> </ImageSupreme>
                     : <></>}
                     </View>

                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:25,marginLeft:10}}>{response?.info.title}</Text>
                    
                    <LinearGradient style={{marginVertical:15,borderRadius:8,backgroundColor:'white',width:150,height:50,alignItems:'center',justifyContent:'center'}} colors={['#0784b5', 'rgba(5,147,132,1)', 'rgba(5,147,132,1)','rgba(1,33,91,1)']}> 
                        <Pressable style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}} onPress={()=>Linking.openURL(url+response?.dealID)}>
                            <Ionicons name={'cart-outline'} size={30} color={'black'} />
                            <Text style={{marginLeft:10}}>Get Offer</Text>
                        </Pressable>
                    </LinearGradient>
                </View>

                <View style={{flex:2}}>
                    {response?.deals !== null ? 
                    (
                    <>
                        <Text style={{color:'white',fontSize:25,marginLeft:10}}>Deals</Text>
                        <MemoizedList/>
                    </>
                    )
                    : 
                    <>
                    <Text style={{color:'white'}}>No more deals Found</Text>
                    </>
                    }
                </View>
     </SafeAreaView>
    )
}