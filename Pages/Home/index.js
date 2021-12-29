import { Text, View , ActivityIndicator , Image , ScrollView , useWindowDimensions  } from 'react-native';
import React, { useEffect, useState } from "react";
import api from '../../Services/api';
import styles from './style';
import ModalSelector from 'react-native-modal-selector'
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Home(){

    const window = useWindowDimensions();
    const [resp, setResp] = useState();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const handleNome = (nome) => {
      return (nome.length > 14 ? nome.substring(0,10) + '...' : nome);
    }
    useEffect(() => {
      api
        .get("/deals?storeID=1")
        .then((response) => {setResp(response.data) ;setLoading(true)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    const createCards = (data , key) => {
      return(
        <View key = {key} style = {styles.card}>
          <Image style={styles.tinyLogo} source={{uri : data.thumb ?? '-'}}></Image>
          <Text style = {styles.GameTitle}>{handleNome(data.title) ?? '-'}</Text> 
          <Text style = {styles.SalesPrice}> ${data.salePrice ?? '-'}</Text>  
          <Text style = {styles.NormalPrice}> ${data.normalPrice ?? '-'}</Text>
        </View>
      )
    }
    const data1 = [
      { key: 0, section: true, label: 'Fruits' },
      { key: 1, label: 'Red Apples' },
      { key: 2, label: 'Cherries' },
      { key: 3, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
      { key: 4, label: 'Vegetable', customKey: 'Not a fruit' }
  ];

    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.container}/>
        <Searchbar
            style = {{width:window.width/1.2 , borderRadius : 20 , marginBottom : 30}}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        <ScrollView contentContainerStyle={styles.scrollView}>
          
           <ModalSelector
                    style={{width:window.width/2 , alignItems : 'center' , margin : 20 , justifyContent : 'center' }}
                    data={data1}
                    initValue="Steam"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />

        {loading ? (
          resp.map((game ,i) => createCards(game , i))) : 
          (<ActivityIndicator size={60} color={"#424242"} />) 
        }
        </ScrollView>
        </View>
  );
}