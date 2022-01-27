import React , { useEffect, useState} from 'react'
import { View , Image , SafeAreaView ,Pressable, Text , StatusBar , ActivityIndicator , FlatList} from 'react-native';
import api from '../../../Services/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const createDealList = (deal) => {
    return (
        <View style={{margin:20}}>
            <Text style={{color:"white"}}>{deal.item.price}</Text>
        </View>
    )
}

export default function DealFocused({route,navigation}){
    const gameID = route.params;
    const [loading,setLoading] = useState(false);
    const [response,setResp] = useState();
    
    const MemoizedList = React.memo(() => {
        return (
          <FlatList
          removeClippedSubviews = {true}
          initialNumToRender = {9}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch = {9}data={response?.deals}
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
        <SafeAreaView style={{marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center',backgroundColor:'#192428'}}> 
            {!loading && <LoadingView/>}
                <View style={{style:2,width:'100%',backgroundColor:'red'}} >
                    <Pressable style={{position:'absolute',top:10,right:30,zIndex:20}} onPress={()=> navigation.goBack()}>
                        <Ionicons name={'close-circle-outline'} size={30} color={'#1470d9'} />
                    </Pressable>
                    <Image style={{width:'100%',height:353}}source={{uri : response?.info.thumb.replace("capsule_sm_120","capsule_616x353")}}></Image>
                </View>

                <View style={{flex:2}}>
                    <Text>{response?.info.title}</Text>
                    <Text>Deals</Text>
                </View>
     </SafeAreaView>
    )
}