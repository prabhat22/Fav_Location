import { SAVE_PLACE, SET_PLACES } from "../actions/place"
import Place from "../../models/place"

const initialState={
    places:[]
}
export default (state=initialState,action)=>
{
    console.log('reducer',state)
switch(action.type)
{
 
    case SET_PLACES:
        return{
            places: action.data.map(place=>new Place(place.id.toString(),place.title,place.imageUrl,place.address,place.lat,place.lon))
        }
   case SAVE_PLACE:
       {
          const newPlace=new Place(action.data.id.toString(),action.data.title,action.data.uri,action.data.address,action.data.coord.lat,action.data.coord.lng)
          console.log('add place reducer',newPlace)
          return{
              places:state.places.concat(newPlace)
          }
       }
       default:
           return state
}
}