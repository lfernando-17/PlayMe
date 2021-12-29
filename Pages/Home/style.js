import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView :{
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'gray'
  },
  container : {
    flex : 1,
    flexDirection : 'row',
    flexWrap: 'wrap',
  },
    GameTitle: {
      color : 'black',
      fontSize : 20
    },
    NormalPrice: {
      color : 'grey',
      fontSize : 10,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },
    SalesPrice: {
      color : 'black',
      fontSize : 15
    },
    tinyLogo: {
      width: 120,
      height: 100,
      resizeMode : 'stretch'
    },
    card: {
      marginTop : 60,
      alignItems : 'center',
      justifyContent : 'center',
      width: 150,
      height: 120
    },
  });


  export default styles ;