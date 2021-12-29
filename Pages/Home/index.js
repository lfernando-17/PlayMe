import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ActivityIndicator , Image , ScrollView ,SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import api from '../../Services/api';
import style from './style';
import styles from './style';

export default function Home(){
    
    const [resp, setResp] = useState();
    const [loading, setLoading] = useState(false);

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
        <View key = {key} style = {style.card}>
          <Image style={style.tinyLogo} source={{uri : data.thumb ?? '-'}}></Image>
          <Text style = {style.GameTitle}>{handleNome(data.title) ?? '-'}</Text> 
          <Text style = {style.SalesPrice}> ${data.salePrice ?? '-'}</Text>  
          <Text style = {style.NormalPrice}> ${data.normalPrice ?? '-'}</Text>
        </View>
      )
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          resp.map((game ,i) => createCards(game , i))) : 
          (<ActivityIndicator size={60} color={"#424242"} />) 
        }
        </ScrollView>
  );
}