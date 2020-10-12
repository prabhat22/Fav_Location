import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location'
import Colors from '../constants/Colors';
import MapPicker from './MapPicker';
export default function LocationPicker(props) {
    const [location, setLocation] = useState(Object);
    const [isFetching, setFetching] = useState(false);
    const getLocationHandler = async () => {
        try {
            setFetching(true);
            const isAllowed = await Location.requestPermissionsAsync();
            if (!isAllowed) {
                return;
            }
            const userLocation = await Location.getCurrentPositionAsync(
                {
                    timeout: 5000
                }
            )
            console.log(userLocation);
            setLocation(
                {
                    lat: userLocation.coords.latitude,
                    lng: userLocation.coords.longitude
                }
            )
            props.onLocationPick( {
                lat: userLocation.coords.latitude,
                lng: userLocation.coords.longitude
            });

        }
        catch (err) {
            console.log(err)
            Alert.alert('Cannot fetch location', 'Please try again', [{ text: 'okay' }])
        }
        setFetching(false)

    }
    const getLocationOnMapHandler=()=>
    {
        props.navigation.navigate('Map');
    }
    let picklocation=props.navigation.getParam('location')
    useEffect(()=>
    {
      if(picklocation)
      {
          
        setLocation({
            lat:picklocation.lat,
            lng:picklocation.lng
        })
        console.log('location from map',location)
        props.onLocationPick(location);
        
      }
       
    },[picklocation])
    return (
        <View style={styles.locationContainer}>
            <MapPicker style={styles.locationPreview} location={location} onPress={getLocationOnMapHandler} >

                {

                    !isFetching ? (<Text>
                        No location picked.Pick some location..
                    </Text>) : (
                            <ActivityIndicator size='large' color={Colors.primary} />
                        )
                }
            </MapPicker>
            <View style={styles.action}>
            <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
            <Button title="Choose loaction on Map" color={Colors.primary} onPress={getLocationOnMapHandler} />
            </View>
           
        </View>
    )
}
const styles = StyleSheet.create(
    {
        locationContainer:
        {
            marginTop: 15,
            alignItems: 'center'
        },
        locationPreview:
        {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            width: '100%',
            height: 150
        },
        action:
        {
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%'
        }
    }
)