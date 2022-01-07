import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerRating : window => ({
    width : window.width * 0.85,
    alignItems:'flex-end',
    marginBottom : 10,
    marginTop : 15,
  }),
  button: {
    borderRadius: 10,
    padding: 13,
    marginBottom : 10,
    elevation: 2,
    width: 'auto',
    margin : 10 , 
    alignItems : 'center' , 
    justifyContent : 'center'
  },
  containerOfAllCard : {
    flexDirection : 'row',
    justifyContent : 'space-evenly',
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
    justifyContent :'center',
  },
  tinyLogo:  window =>( {
    width: (window.width > 600 ? 180 : 120),
    height: (window.width > 600 ? 180 : 120),
    borderRadius : 20,
  }), 
  Genres: {
    color : 'black',
    fontSize : 12,
    margin : 5,
    textAlign : 'center'
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
    elevation: 5,
  }),
  });

  export default styles ;