import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import  * as PlaceActions from '../store/actions/place';


const PlacesListScreen = props => {
  
  const places=useSelector(state=>state.places.places);

  const dispatch=useDispatch();
    
  useEffect(()=>
  {

    dispatch(PlaceActions.loadPlaces());
    
  },[dispatch])
  // console.log('places',places)
  return (
    <View style={styles.screen}> 
    {/* <Text>List of Place</Text> */}
    <FlatList data={places} keyExtractor={item=>item.id} renderItem={itemData=> <PlaceItem 
      title={itemData.item.title} 
      image={itemData.item.imageUrl}
      address={itemData.item.address}
      onSelect={()=>
      {
        props.navigation.navigate('PlaceDetail',{title:itemData.item.title,id:itemData.item.id})
      }} />
     } />
    </View>
  );
};

PlacesListScreen.navigationOptions = navData=>{
   return { 
     headerTitle: 'All Places',
     headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
       <Item  title="Add Place" iconName='md-add' onPress={()=>
      {
        navData.navigation.navigate('NewPlace');
      }} />
       </HeaderButtons>)
}
};

const styles = StyleSheet.create({

  screen:
  {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default PlacesListScreen;
