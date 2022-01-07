import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerOfAllCard : {
    flexDirection : 'row',
  },
  containerIcon : window =>( {
    alignItems : 'center',
    justifyContent:'center',
    height : (window.width > 600 ? 180 : 120),
    width : (window.width > 600 ? 180 : 120) , 
    marginLeft : 15,
    marginRight: 10
  }),
  containerContenty : {
    flex : 1 ,
    alignItems : 'center',
    justifyContent :'space-evenly',
  },
  tinyLogo:  window =>( {
    width: (window.width > 600 ? 180 : 120),
    height: (window.width > 600 ? 180 : 120),
    borderRadius : 20,
  }), 
  Genres: {
    color : '#8941d1',
    fontSize : 10,
    margin : 5
  },
  GameTitle: {
    color : 'black',
    fontSize : 20,
  },
  card: window => ({
    margin : 10,
    marginLeft : 19,
    marginTop : 30,
    alignItems : 'center',
    justifyContent : 'space-evenly',
    width: window.width * 0.9,
    height: 240,
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
  }),
  });

  export default styles ;