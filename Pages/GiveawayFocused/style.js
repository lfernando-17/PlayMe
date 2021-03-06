import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 13,
    marginBottom : 20,
    width: 'auto',
    margin : 10 , 
    alignItems : 'center' , 
    justifyContent : 'center',
    backgroundColor:'#cfcbc8',
    borderWidth: 2, 
    borderColor: '#696765',
  },
    containerLeave : window => ({
        width : window.width * 0.85,
        alignItems:'flex-end',
        marginBottom : 10,
        marginTop : 15,
      }),
    summary : {
        color : '#8941d1',
        fontSize : 12,
        margin : 5
    },
    Logo:  window =>( {
        width: (window.width > 600 ? 180 : 340),
        height: (window.width > 600 ? 180 : 160),
        borderRadius : 5,
        alignItems:'center',
        justifyContent:'center'
      }),
});

export default style ;