import React from 'react';
import {createStore,combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'; 
import PlacesNavigator from './Navigation/PlacesNavigator';
import placeReducer from './store/reducers/place'
import { Provider } from 'react-redux';
import {init} from './helpers/db';

init().then(
  ()=>
  {console.log('successful')
}).catch(err=>
  {
    console.log('failed',err)
  });
export default function App() {
  const rootReducer=combineReducers(
    {
      places:placeReducer
    }
  )
  const store=createStore(rootReducer,applyMiddleware(ReduxThunk))

  return (
  <Provider store={store}>
    <PlacesNavigator />
  </Provider>
  )
  
 
  
}
