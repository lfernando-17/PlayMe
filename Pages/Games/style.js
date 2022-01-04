import { StyleSheet } from 'react-native';

const styles = (props) =>StyleSheet.create({

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
    width: props.width * 0.9,
    height: 180,
    backgroundColor : 'white',
    borderRadius : 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },


  });

  export default styles ;