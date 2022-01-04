import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  selectGame : {
    marginBottom : 10
  },
  storeSelected : {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    margin : 20 ,
    backgroundColor : '#bfbdbb',
    alignItems : 'center' , 
    justifyContent : 'center'
  },
  loadingView : {
    flex : 1,
    backgroundColor:'#E9E9E9',
    alignItems : 'center',
    justifyContent : 'center'
  },
  scrollView :{
    marginBottom : '20%',
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'#E9E9E9',
    alignItems : 'center',
    justifyContent : 'space-evenly',
  },

  container : {
    backgroundColor:'#E9E9E9',
    alignItems : 'center',
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
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      
      elevation: 6,
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      flexWrap: 'wrap',
      flexDirection : "row",
      justifyContent : 'space-evenly',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 13,
      marginBottom : 20,
      elevation: 2,
      width: 'auto',
      margin : 10 , 
      alignItems : 'center' , 
      justifyContent : 'center'
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
  });


  export default styles ;