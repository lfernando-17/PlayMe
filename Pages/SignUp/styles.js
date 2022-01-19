import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerEnter:{
        alignItems:'center',
        width:"90%",
        height:"90%"
    },
    containerData : {
        marginVertical:10,
        alignItems:'flex-start',
        width:'90%'
    },
    name : {
        alignItems:'flex-start'
    },
    inputProfileInfo : {
        flexDirection:'row',
        width:'90%',
        marginLeft:5,
        marginTop:50
    },
    card : {
        borderTopLeftRadius: 35 ,
        borderTopRightRadius : 35 ,
        backgroundColor:'white',
        height : '68%',
        width:'100%' ,
        alignItems:'center'
    },
    containerCard : {
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    imageProfile : {
        width : 120,
        height : 120 , 
        marginTop:30,
        borderRadius:10,
        overflow: "hidden",
        borderWidth: 5,
        borderColor: "grey"
    },
    txtSignUp : {
        color:'white',
        fontSize:25,
        fontWeight: 'bold'
    },
    containerHeader : {
        zIndex:1,
        position:'absolute',
        marginTop:'20%',
        marginLeft:'30%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    pressableImage : {
        marginHorizontal:10, 
        marginTop:40
    },
    containerAll : {
        flex : 1 ,
        backgroundColor:'#059384'
    },
    input : {
        flexDirection:'row',
        marginVertical:10,
        marginLeft:20,
        alignItems:'center',
        justifyContent:'center',
    },
    pressableLogin : {
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        marginVertical : 30 , 
        backgroundColor:'#08d4c4',
        width:'30%',
        height:'8%'
    },
});

export default styles;