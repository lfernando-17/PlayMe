import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerRating : window => ({
    position:'absolute',
    alignItems:'flex-end',
    top:-20
  }),
  containerOfAllCard : {
    justifyContent : 'space-evenly',
    alignItems:'center'
  },
  containerIcon : window =>( {
    alignItems : 'center',
    justifyContent:'center',
  }),
  containerContenty : {
    alignItems : 'center',
    justifyContent :'center',
  },
  tinyLogo:  window =>( {
    width: (window.width > 600 ? 180 : 120),
    height: (window.width > 600 ? 180 : 160),
    borderRadius : 20,
  }), 
  Genres: {
    marginVertical : 10,
    color : 'white',
    fontSize : 12,
    margin : 5,
    textAlign : 'center'
  },
  GameTitle: {
    color : 'white',
    fontSize : 20,
  },
  card: window => ({
    borderRadius:5,
    justifyContent:'center',
    alignItems : 'center',
    width: '65%',
    height: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }),
  });

  export default styles ;