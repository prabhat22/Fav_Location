import React, { useState } from 'react';
import { View,  StyleSheet,TouchableOpacity , Image } from 'react-native';
import * as Location from 'expo-location'
import Colors from '../constants/Colors';
export default function MapPicker(props)
{
    let imgUrl;
    if(props.location)
    {
        imgUrl=`https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${props.location.lat},${props.location.lng}&key={YOUR_KEY}`    ;
       // console.log(imgUrl)
    }

    return (
<TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview,...props.style}}>
    {
        props.location?(<Image style={styles.image} source={{uri:imgUrl}} />):(props.children)
    }
</TouchableOpacity>
    )
}
const styles=StyleSheet.create(
    {
        locationContainer:
        {
            alignItems:'center'
        },
       image:
       {
           width:'100%',
           height:'100%'
       }
    }
)
