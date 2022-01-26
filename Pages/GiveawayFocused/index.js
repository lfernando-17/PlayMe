import React , { useCallback } from 'react';
import { SafeAreaView, View, Text, StatusBar ,  Image , useWindowDimensions, Pressable , Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './style';


const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (<Pressable style={{marginBottom:10}} onPress={handlePress}><Text style = {{color:'#1470d9'}}>{children}</Text></Pressable>);
};

export default function GiveawayFocused({route , navigation}) {
  const window = useWindowDimensions();
  const data = route.params;

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight || 0, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          
          <View style = {style.containerLeave(window)}>
            <Pressable onPress={()=> navigation.goBack()}>
                <Ionicons name={'close-circle-outline'} size={30} color={'#1470d9'} />
              </Pressable> 
            
          </View>

            <Image  style={style.Logo(window)} source={{uri : data.image }}></Image>  
            
            
            <View style = {{ marginVertical : 20,width : '60%',justifyContent : 'center', alignItems : 'center'}}>
              <Text style={{ textAlign: 'center',marginTop : 10 , fontSize : 18}}>{data.title}</Text>
            </View>

            <View  style={{ marginHorizontal : 20,marginVertical : 20,borderWidth: 1,borderColor: "black",borderRadius: 50,alignItems:'center',justifyContent:'center'}}>
            <Text style ={{textAlign:'center',marginTop : 10}}>Description :  </Text>
            <Text style ={{textAlign:'center',margin : 20}}>{data.description}</Text>
            </View>


            <View  style={{ marginHorizontal : 20,marginVertical : 20,borderWidth: 1,borderColor: "black",borderRadius: 50,alignItems:'center',justifyContent:'center'}}>
             <Text style ={{textAlign:'center',marginTop : 10}}>How to get your Key : </Text>
            <Text style ={{textAlign:'center',margin : 20}}>{data.instructions}</Text>
            </View>
            
            <Text style ={{textAlign:'center',margin : 20}}> Platforms : {data.platforms}</Text>

            <OpenURLButton url={data.open_giveaway_url}>Access</OpenURLButton>
                          
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}






