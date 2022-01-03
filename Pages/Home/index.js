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
  TouchableWithoutFeedback
} 
  from 'react-native';
import React, { useEffect, useState , useCallback } from "react";
import api from '../../Services/api';
import styles from './style';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const MemoizedList = React.memo(({resp,createCard,header }) => {
  return (
    <FlatList
    columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, margin : 20  }}
    data={resp}
    renderItem={createCard}
    keyExtractor={item => item.gameID}
    numColumns={3}
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

export default function Home(){

    const window = useWindowDimensions();
    const [resp, setResp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storeSelected,setStore] = useState(1);
    const [valueLabelQuery, setValueLabelQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [actionTriggered, setActionTriggered] = useState('');
    const [inspecGame, setInspecGame] = useState([{}]);

    const [changedStore , setStoreChange] = useState(false);
    const [changeGame , setChangedGame] = useState(false)
    const [deals, setDeals] = useState([])
    const [filterSelected , setfilterSelected] = useState('Price');

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

    useEffect(async () => {
      await api
        .get("/deals?storeID="+storeSelected+"&title="+searchQuery+'&sortBy='+filterSelected)
        .then((response) => {setResp(response.data) ;setLoading(true)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, [storeSelected,searchQuery,changedStore,filterSelected]);

    useEffect(async () => {
      await api
        .get("/games?id="+inspecGame.gameID)
        .then((response) => {setDeals(response.data.deals) ;setLoading(true)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, [changeGame]);

    const createCards = (data) => {
      return(
          <Pressable style = {styles.card}  onPress={()=>{setChangedGame(!changeGame),setInspecGame(data.item);setActionTriggered('Games');setModalVisible(!modalVisible)}}>   
            <Image  style = {styles.tinyLogo} source={{uri : data.item.thumb ?? '-'}}></Image>
            <Text  style = {styles.GameTitle}>{handleNome(data.item.title) ?? '-'}</Text> 
            <Text  style = {styles.SalesPrice}> {(data.item.salePrice ?? '-') == '0.00' ? 'Free' : '$'+(data.item.salePrice ?? '-') }</Text>  
            <Text  style = {styles.NormalPrice}> ${data.item.normalPrice ?? '-'}</Text>
          </Pressable>
      )
    }

  const stores = [
      { key: 1 ,label: 'Steam' },
      { key: 25, label: 'Epic Games' },
      { key: 8, label: 'Origin' },
      { key: 31, label: 'Blizzard Shop' },
      { key: 13, label: 'Uplay'}
  ];

  const filters = [
    { option: 'Deal Rating' },
    { option: 'Title' },
    { option: 'Savings' },
    { option: 'Price' },
    { option: 'Reviews'},
    { option: 'Release'},
    { option: 'recent'}
];

    const Header = () => (
      <View style = {{flex : 1 , alignItems : 'center',flexDirection:'row', justifyContent:'center'}}> 
        <Pressable onPress={()=>{setModalVisible(true);setActionTriggered('Stores')}} style={styles.button}>
          <Text key ={stores.find(x => x.key === storeSelected).key}>{stores.find(x => x.key === storeSelected).label}</Text>
        </Pressable>
        <Pressable onPress={()=>{setModalVisible(true);setActionTriggered('Filter')}} style={styles.button}>
          <Text>{filters.find(x => x.option == filterSelected).option}</Text>
        </Pressable>
      </View>
    );
    return (
      <View style={styles.container, {flex: 1}}>
      <SafeAreaView style={styles.container}> 
          <Searchbar
                style = {{width:window.width/1.2 , borderRadius : 20 , marginBottom : 30 , marginTop : 30}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                onSubmitEditing = {() => setSearchQuery(valueLabelQuery)}
                onIconPress = {() => setSearchQuery(valueLabelQuery)}
                value={valueLabelQuery}
              />
       </SafeAreaView>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
              >
                
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.modalView}>
                {
                  actionTriggered === 'Stores' ? (
                    stores.map((store , index) => {return (
                    <Pressable  key={index} onPress={()=>{setStoreChange(!changedStore); setModalVisible(!modalVisible); setStore(store.key); setLoading(false)}} style={styles.button}>
                        <Text>{store.label}</Text>
                    </Pressable>
                    )})) 
                    : 
                    (
                      actionTriggered ==='Filter' ? 
                      (
                        filters.map((filter , index) => {return (
                          <Pressable  key={index} onPress={()=>{setStoreChange(!changedStore); setModalVisible(!modalVisible); setfilterSelected(filter.option); setLoading(false)}} style={styles.button}>
                              <Text>{filter.option}</Text>
                          </Pressable>)})
                      ) 
                      : 
                        (
                        <View style={{justifyContent :'center',alignItems:'center'}}>
                          <Image style={[styles.tinyLogo,styles.selectGame]} source={{uri : inspecGame.thumb ?? '-'}}></Image>
                          <Text  style = {[styles.GameTitle,styles.selectGame]}>{(inspecGame.title) ?? '-'}</Text> 
                          <Text  style = {[styles.SalesPrice,styles.selectGame]}> ${inspecGame.salePrice ?? '-'}</Text>  
                          <Text  style = {styles.NormalPrice}> ${inspecGame.normalPrice ?? '-'}</Text>
                          <OpenURLButton url={supportedURL} deal = {inspecGame.dealID}> ${inspecGame.salePrice ?? '-'} on {stores.find(x => x.key == inspecGame.storeID)?.label}</OpenURLButton>
                          
                          {deals.map((deal , index)=>{stores.map((store)=>{ 
                            store.key == deal.storeID && deal.storeID != inspecGame.storeID ? (
                            <OpenURLButton url={supportedURL} deal = {deal.dealID}> ${deal.salePrice ?? '-'} on {stores.find(x => x.key == deal.storeID)?.label}</OpenURLButton>
                          ) 
                          : (
                            <></>
                          )}) })}
                          </View>
                        )
                    )
                }
              </View>
            </View>
          </Modal>

        {loading ? (
          <View style={{backgroundColor:'#E9E9E9',alignItems : 'center',marginBottom : '20%'}}>
            <MemoizedList resp={resp} createCard={createCards} header={Header}/>
           </View>
          ) : 
          (<View style={styles.loadingView}><ActivityIndicator size={60} color={"#424242"} /></View>) 
        }
        </View>
  );
}