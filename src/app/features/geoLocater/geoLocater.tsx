import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {GeoForm} from './geoForm';
import { geoFormFileds} from './geoFormFields';
import getCoordinatesAction, {getState, updateLatLong} from '../../store/geoLocationSlice';


export function GeoLocater(){
const state = useAppSelector(getState);
let dispatch = useAppDispatch();
useEffect(() =>  {
    navigator.geolocation.getCurrentPosition(function(position) {
    dispatch(updateLatLong({lat:position.coords.latitude, 
      long:position.coords.longitude,
    timeStamp: position.timestamp}))
  });
})
  return (
   <div>
    <li>Lat: {state.lattitude}</li>
    <li>Long: {state.longitude}</li>
    <li>Date: {state.currentTime.date}</li>
    <li>Time: {state.currentTime.time}</li>
    <GeoForm lattitude={state.lattitude} longitude={state.longitude} formFields={geoFormFileds}></GeoForm>
   </div>
  )
}


