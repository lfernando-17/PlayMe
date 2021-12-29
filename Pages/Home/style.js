import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView :{
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'#E9E9E9',
    alignItems : 'center',
    justifyContent : 'space-evenly',
  },

  container : {
    backgroundColor:'#E9E9E9',
    alignItems : 'center'
  },

    GameTitle: {
      color : 'black',
      fontSize : 20
    },

    NormalPrice: {
      color : 'black',
      fontSize : 10,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },

    SalesPrice: {
      color : 'orange',
      fontSize : 18
    },

    tinyLogo: {
      width: 110,
      height: 60,
      resizeMode : 'stretch',
      borderRadius : 3
    },

    card: {
      margin : 10,
      marginTop : 30,
      alignItems : 'center',
      justifyContent : 'space-evenly',
      width: 150,
      height: 180,
      backgroundColor : 'white',
      borderRadius : 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
    },
  });


  export default styles ;