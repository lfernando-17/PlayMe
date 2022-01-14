import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pressableLogin : {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginVertical : 30 , 
        backgroundColor:'#08d4c4',
        width:'30%',
        height:'8%'
    },
    containerCards : {
        flexDirection:'row' ,
        marginVertical:30
    },
    containerInputs : {
        marginVertical:30,
        width : '80%',
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    login : {
        borderTopLeftRadius: 35 ,
        borderTopRightRadius : 35 ,
         backgroundColor:'white',
         height : '65%',
         width:'100%' , 
         alignItems:'center'
    },
    containerLogin : {
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    txtWelcome : {
        color:'white',
        fontSize:25,
        fontWeight: 'bold'
    },
    containerWelcome : {
        position:'absolute',
        marginTop:'30%',
        marginLeft:'10%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    containerAll : {
        flex:1,
        backgroundColor:'#059384'
    },
    input : {
        flexDirection:'row',
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'
    },
    card :{
        alignItems:'center',
        justifyContent:'center',
        marginVertical : 5,
        marginHorizontal : 10,
        borderRadius : 30
    },
    cardIcon : {
        alignItems:'center',
        justifyContent:'center',
        margin:8  
    }

    });
  
  
export default styles ;