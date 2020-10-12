import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MapPicker from '../components/MapPicker';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
  const placeId=props.navigation.getParam('id');
  const placeData=useSelector(state=>state.places.places.find(place=>place.id===placeId));
  console.log(placeData)
  const location=
  {
    lat:placeData.lat,
    lng:placeData.lng
  }
  const mapHandler=()=>
  {
    props.navigation.navigate('Map',{initialLocation:location,readOnly:true})
  }
  return (
    <ScrollView contentContainerStyle={{alignItems:'center'}}>

        <Image style={styles.image} source={{uri:placeData.imageUrl}} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>
                   {placeData.address}
            </Text>
           
          </View>
          <MapPicker style={styles.mapPreview} location={location} onPress={mapHandler} />
        </View>

        

    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions=(navData)=>
{
  return {
    headerTitle:navData.navigation.getParam('title')
  }
}


const styles = StyleSheet.create({
  image: {
    height: 150,
    minHeight: 300,
    width: '100%',
    backgroundColor:'#ccc'
  
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});


export default PlaceDetailScreen;
