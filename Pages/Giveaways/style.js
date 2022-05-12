import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    storeSelected : {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        margin : 20 ,
        backgroundColor : '#bfbdbb',
        alignItems : 'center' , 
        justifyContent : 'center'
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
    loadingView : {
        flex : 1,
        backgroundColor:'#192428',
        alignItems : 'center',
        justifyContent : 'center'
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
});

export default style