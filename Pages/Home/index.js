import { 
  Text, 
  View , 
  ActivityIndicator , 
  Image , 
  ScrollView , 
  useWindowDimensions , 
  Modal , 
  Pressable,
  TouchableWithoutFeedback
} 
  from 'react-native';
import React, { useEffect, useState } from "react";
import api from '../../Services/api';
import styles from './style';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


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
      return (nome.length > 14 ? nome.substring(0,10) + '...' : nome);
    }

    useEffect(async () => {
      await api
        .get("/deals?storeID="+storeSelected+"&title="+searchQuery)
        .then((response) => {setResp(response.data) ;setLoading(true)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, [storeSelected,searchQuery]);

    const createCards = (data , key) => {
      return(
          <Pressable key = {key} style = {styles.card}  onPress={()=>{setInspecGame(data);setActionTriggered('Games');setModalVisible(!modalVisible)}}>   
            <Image  style={styles.tinyLogo} source={{uri : data.thumb ?? '-'}}></Image>
            <Text  style = {styles.GameTitle}>{handleNome(data.title) ?? '-'}</Text> 
            <Text  style = {styles.SalesPrice}> ${data.salePrice ?? '-'}</Text>  
            <Text  style = {styles.NormalPrice}> ${data.normalPrice ?? '-'}</Text>
          </Pressable>
      )
    }
    const stores = [
      { key: 1 ,label: 'Steam'  , url :'https://store.steampowered.com/app/'},
      { key: 25, label: 'Epic Games' },
      { key: 8, label: 'Origin' },
      { key: 31, label: 'Blizzard Shop' },
      { key: 13, label: 'Uplay'}
  ];

    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.container}/>
        <Searchbar
            style = {{width:window.width/1.2 , borderRadius : 20 , marginBottom : 30 , marginTop : 30}}
            placeholder="Search"
            onChangeText={onChangeSearch}
            onSubmitEditing = {() => setSearchQuery(valueLabelQuery)}
            onIconPress = {() => setSearchQuery(valueLabelQuery)}
            value={valueLabelQuery}
          />

            <Modal
              animationType="none"
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
                    <Pressable  key={index} onPress={()=>{ setModalVisible(!modalVisible); setStore(store.key)}} style={styles.button}>
                        <Text>{store.label}</Text>
                    </Pressable>
                    )})) 
                    : 
                    (
                    <View style={{justifyContent :'center',alignItems:'center'}}>
                        <Image style={styles.tinyLogo} source={{uri : inspecGame.thumb ?? '-'}}></Image>
                        <Text  style = {styles.GameTitle}>{(inspecGame.title) ?? '-'}</Text> 
                        <Text  style = {styles.SalesPrice}> ${inspecGame.salePrice ?? '-'}</Text>  
                        <Text  style = {styles.NormalPrice}> ${inspecGame.normalPrice ?? '-'}</Text>
                    </View>
                    )
                }
              </View>
            </View>
          </Modal>

        {loading ? (
          <ScrollView contentContainerStyle={styles.container}>
            <Pressable onPress={()=>{setModalVisible(true);setActionTriggered('Stores')}} style={styles.button}>
              <Text key ={stores.find(x => x.key === storeSelected).key}>{stores.find(x => x.key === storeSelected).label}</Text>
            </Pressable>
            <View style ={styles.scrollView}>
            {resp.map((game ,i) => createCards(game , i))}
            </View>
          </ScrollView>
          ) : 
          (<View style={styles.container}><ActivityIndicator size={60} color={"#424242"} /></View>) 
        }
        </View>
  );
}