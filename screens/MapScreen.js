import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MapScreen = props => {

  const initialLocation=props.navigation.getParam('initialLocation');
  const readOnly=props.navigation.getParam('readOnly');
  const mapRegion=
  {
    latitude:initialLocation?initialLocation.lat: 28.605981140354988,
    longitude:initialLocation?initialLocation.lng: 77.22041700035334,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421
  }
  const [location,setLocation]=useState(initialLocation);
  
  const saveLocationHandler=useCallback(()=>
  {
    if(!location)
    {
      return;
    }
    props.navigation.navigate('NewPlace',{location:location});
  },[location])

  useEffect(()=>
  {
   props.navigation.setParams({saveLoc:saveLocationHandler})
  },[saveLocationHandler]);

  
  const locationHandler=(event)=>
  {
   setLocation(
     {
       lat:event.nativeEvent.coordinate.latitude,
       lng:event.nativeEvent.coordinate.longitude
     }
   )
  }
  let markerCoordinates;
  if(location)
  {
    markerCoordinates={
      latitude:location.lat,
      longitude:location.lng
    }
  }

  return (
 <MapView style={styles.map} region={mapRegion} onPress={locationHandler}>
   {
     markerCoordinates && (  <Marker coordinate={markerCoordinates}  title='Picked location' />)
   }
 
 </MapView>
  );
};
MapScreen.navigationOptions=(navData)=>
{
  const saveFn=navData.navigation.getParam('saveLoc');
  const readOnly=navData.navigation.getParam('readOnly');
  if(readOnly)
  {
    return;
  }
  return {
    headerRight:(<TouchableOpacity style={styles.button} onPress={saveFn}>
      <Text style={styles.text}> Save</Text>
    </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  map:
  {
    flex:1
  },
  button:
  {
    marginHorizontal:20,
  },
  text:{
    fontSize:16
  }
});

export default MapScreen;
