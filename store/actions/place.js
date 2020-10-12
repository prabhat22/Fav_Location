
import * as FileSystem from 'expo-file-system'; 
import {addPlace,fetchPlaces} from "../../helpers/db";
export const SAVE_PLACE='SAVE_PLACE';
export const SET_PLACES='SET_PLACES';
export const savePlace=(title,imageUrl,location)=>
{
    return async (dispatch)=>
    {
        console.log('add place action',title,imageUrl,location)
        const response=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyCpAKMujv0fHC4TK3EKb7bWcU2cLj-KKKI`)
        if(response.status!==200)
        {
            throw new Error('api does not work')
        }
        const responseData=await response.json();
        const address=responseData.results[0].formatted_address;
        console.log("formated",address)
        const fileName=imageUrl.split('/').pop();
        const newPath=FileSystem.documentDirectory+fileName
        try
        {
            await   FileSystem.moveAsync(
                {
                    from:imageUrl,
                    to:newPath
                }
            )
            const dbResult= await addPlace(title,newPath,address,location.lat,location.lng)
            console.log(dbResult);

            
        dispatch({
            type:SAVE_PLACE,
            data:{id:dbResult.insertId,title:title,uri:newPath,address:address,coord:location}
        })
        }
        catch(Err)
        {
            console.log('error at save place',Err)
            throw Err;
        }
    

    }

}
export const loadPlaces=()=>
{
    return async (dispatch)=>
    {
        try
        {
          const dbResult= await fetchPlaces();
          console.log(dbResult);
          dispatch(
              {
                  type:SET_PLACES,data:dbResult.rows._array
              }
          )
        }
        catch(err)
        {
            console.log(err);
            throw err
        }
    }
}