import React,{useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet,ScrollView,TextInput, Button } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as PlaceActions from '../store/actions/place'
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';
const NewPlaceScreen = props => {
  const [title,setTitle]=useState('');
  const [selImg,setImg]=useState();
  const [selLocation,setLoc]=useState({});
  const dispatch=useDispatch();
  const submitHandler=()=>
  {
   dispatch(PlaceActions.savePlace(title,selImg,selLocation));
   props.navigation.goBack();
  }
  const imgHandler=(uri)=>
  {
  setImg(uri);

  }
const pickLocationHandler=useCallback((location)=>
{
  if(location)
    {
      console.log('before save loc',location)
      setLoc({
        lat:location.lat,
        lng:location.lng
      });
      console.log('a new place screen loc',selLocation)
    }

},[])

  return (
    <View>
       <ScrollView style={styles.form}>
        <Text style={styles.label}> Title </Text>
        <TextInput style={styles.input} value={title} onChangeText={(text)=>setTitle(text)} />
        <ImgPicker onImgTaken={imgHandler} />
        <LocationPicker navigation={props.navigation} onLocationPick={pickLocationHandler} />
        <View style={styles.buttonContainer}>
        <Button title='Save place' style={styles.button} color={Colors.primary} onPress={submitHandler} />
        </View>
      
      </ScrollView>
    </View>
  );
};

NewPlaceScreen.navigationOptions={
  title:'Add Place'
}
const styles = StyleSheet.create({
  form:
{
  marginVertical:20,
  padding:10
},
label:
{
  fontSize:20,
  marginBottom:5
},
input:
{
  borderBottomColor:'grey',
  borderBottomWidth:1,
  padding:10
},
buttonContainer:
{
  marginVertical:10,
  justifyContent:'center',
  alignItems:'center'

},
button:
{
  width:'100%'
}
});

export default NewPlaceScreen;
