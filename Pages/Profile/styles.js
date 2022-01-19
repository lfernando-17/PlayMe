import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerButton : {
        flexDirection:'row',
        marginTop:30  
    },
    containerLocale : {
        flexDirection:'row',
        alignItems:'center',
        marginTop:50
    },
    containerName:{
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    containerNameInfo:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:60,
        width:'100%'
    },
    profileEmail : {
        flexDirection:'row' , 
        alignItems:'center',
        justifyContent:'center' , 
        marginTop:5
    },
    profileImage : {
        width : 100,
        height : 100 , 
        marginTop:60,
        borderRadius:10,
        overflow: "hidden",
        borderWidth: 5,
        borderColor: "#059384"
    },
    containerProfileData:{
        width:'100%',
        marginLeft:30
    },
    containerAll : {
        flex:1 , 
        alignItems:'center',
        justifyContent:'center'
    }
    
});


export default styles;