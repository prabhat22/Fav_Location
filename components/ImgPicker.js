import React, { useState } from 'react';
import {View,Text,StyleSheet,Button,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import Colors from '../constants/Colors';
export default function ImgPicker(props)
{

    const [img,setImg] =useState('')

    const imgHandler=async()=>
    {
      const image= await  ImagePicker.launchCameraAsync(
         {
            // allowsEditing:true,
             aspect:[16,9],
             quality:0.7
         }
     );
  
     console.log(image);
     props.onImgTaken(image.uri)
     setImg(image.uri)
     console.log('image uri:',img)
    

    }
   

    return(
        <View style={styles.imgContainer}>
            <View style={styles.imgPreview}>
                {
                    !img?( <Text>
                        No image is picked yet.
                    </Text>):(<Image source={{uri:img}} style={styles.image} />)
                }
                </View> 
                <Button title="Add Image" color={Colors.primary} onPress={imgHandler} />   

        </View>
    )
}
const styles=StyleSheet.create(
    {
     imgContainer:
     {
         alignItems:'center'
     },
     imgPreview:
     {
         width:'100%',
         height:200,
         borderWidth:1,
         borderColor:'grey',
         alignItems:'center',
         marginVertical:10,
         justifyContent:'center'

     },
     image:
     {
         width:'100%',
         height:'100%'
     }
    }
)