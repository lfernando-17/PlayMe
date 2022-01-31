import React from 'react'
import { Image} from 'react-native'


export default function ImageSupreme({style,urlTrue,urlError}){

    const [isValid,setValid] = React.useState()

    React.useEffect(() => {
        if (urlTrue != undefined){
        fetch(urlTrue)
        .then((res) => {
          if (res.status == 404) {
            setValid(false)
          } else {
            setValid(true)
          }
        })
        .catch((err) => {
            setValid(false)
        });
        return () => {
            setValid(null); // This worked for me
          };
        }
    }, []);

    return (
        <>
        {isValid  ? <Image style={style} source = {{uri : urlTrue}}></Image> :<Image style={style} source = {{uri : urlError}}></Image> }
        </>
    )
}