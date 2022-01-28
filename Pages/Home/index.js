import { 
  Text, 
  View , 
  ActivityIndicator , 
  Image ,
  Linking , 
  FlatList ,
  useWindowDimensions , 
  Modal , 
  Pressable,
  StatusBar,
  TouchableWithoutFeedback
} 
  from 'react-native';
import React, { useEffect, useState , useCallback } from "react";
import api from '../../Services/api';
import styles from './style';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const supportedURL = "https://www.cheapshark.com/redirect?dealID=";


const OpenURLButton = ({ url, children,deal }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url+deal);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (<Pressable style = {styles.storeSelected} onPress={handlePress}><Text>{children}</Text></Pressable>);
};

const isValid = async (url)=> {
  await fetch(url)
      .then((resp)=>{
        if (resp.status == 404) {
          return false;
        }
        return true;
      })

}

export default function Home({navigation}){

    const window = useWindowDimensions();
    const [resp, setResp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storeSelected,setStore] = useState(1);
    const [valueLabelQuery, setValueLabelQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [changeGame , setChangedGame] = useState(false)
    const [filterSelected , setfilterSelected] = useState('Price');

    const createCard =  (data)=>{

      return (
        <View style={{margin:10, overflow: 'hidden',borderBottomLeftRadius: 15,borderBottomRightRadius: 15 }}>
          <Pressable onPress={()=>navigation.navigate("DealFocused",data.item.gameID)}>
            <Image style={{borderTopLeftRadius:15,borderTopRightRadius:15,resizeMode:'stretch',width:160,height:90}}   source={{uri : isValid(data.item.thumb.replace("capsule_sm_120","capsule_616x353")) ? data.item.thumb.replace("capsule_sm_120","capsule_616x353") :data.item.thumb }}></Image>
            <LinearGradient style={{borderBottomRightRadius: 15,borderBottomLeftRadius: 15 , alignItems:'center',flexDirection:'row',justifyContent:'space-evenly',height:30 }} colors={['#0784b5', 'rgba(5,147,132,1)', 'rgba(5,147,132,1)','rgba(1,33,91,1)']}> 
              <Text style={{color : 'orange',fontSize : 15}}>${data.item.salePrice}</Text>
              <Text style={{fontSize:10,textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>${data.item.normalPrice}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )
    }

    const MemoizedList = React.memo(() => {
      return (
        <FlatList
        removeClippedSubviews = {true}
        initialNumToRender = {9}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch = {9}
        columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , marginBottom : 10 , justifyContent : 'center' }}
        data={resp}
        renderItem={createCard}
        keyExtractor={item => item.dealID}
        numColumns={window.width > 600 ? 3 : 2}
        />
      )
    }, (prevProps, nextProps) => {
      if (prevProps.resp === nextProps.resp) {
          return true; // props are equal
      } else {
          return false; // props are not equal -> update the component
      }
    })

    const onChangeSearch = (query) => 
    {
      query ?
      (
        setValueLabelQuery(query)
      )
        : 
        (
          setSearchQuery(query),
          setValueLabelQuery(query)
        )
    };

    const handleNome = (nome) => {
      return (nome?.length > 14 ? nome.substring(0,10) + '...' : nome);
    }

    const LoadingView = ()=>{
      return (
        <View style={{position: "absolute",left: 0,right: 0,top: 0,bottom: 0,opacity: 0.7,backgroundColor: "#192428",justifyContent: "center",alignItems: "center",}}>
            <ActivityIndicator size="small" color="#FFD700"/>
        </View>
        )
    }
    useEffect(async () => {
      await api
        .get("https://www.cheapshark.com/api/1.0/deals?storeID=1")
        .then((response) => {setResp(response.data) ;setLoading(true)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    return (
      <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center',backgroundColor:'#192428'}}> 
          <Searchbar
                style = {{width:window.width/1.2 , borderRadius : 20 , marginBottom : 30 , marginTop: StatusBar.currentHeight + 140}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                onSubmitEditing = {() => setSearchQuery(valueLabelQuery)}
                onIconPress = {() => setSearchQuery(valueLabelQuery)}
                value={valueLabelQuery}
              />
              <View>
              {!loading && <LoadingView/>}
                <MemoizedList resp={resp}/>
              </View>
       </SafeAreaView>


  );
}