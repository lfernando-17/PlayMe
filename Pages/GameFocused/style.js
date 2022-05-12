import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    containerLeave : window => ({
        width : window.width * 0.85,
        alignItems:'flex-end',
        marginBottom : 10,
        marginTop : 15
      }),
    summary : {
        color : '#8941d1',
        fontSize : 12,
        margin : 5
    },
    Logo:  window =>( {
        width: (window.width > 600 ? 180 : 250),
        height: (window.width > 600 ? 180 : 200),
        resizeMode:'stretch'
      }),
      similarGames : window =>( {
        width: (window.width > 600 ? 180 : 120),
        height: (window.width > 600 ? 180 : 120)
      }),
      screenshots:  window =>( {
        width: (window.width > 600 ? 180 : 180),
        height: (window.width > 600 ? 180 : 180),
        marginRight : 20
      }),  
});

export default style ;