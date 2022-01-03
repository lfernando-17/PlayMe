import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  tinyLogo: {
    width: 110,
    height: 60,
    resizeMode : 'stretch',
    borderRadius : 3
  }, 
  
  GameTitle: {
    color : 'black',
    fontSize : 20
  },
  card: {
    margin : 10,
    marginLeft : 19,
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