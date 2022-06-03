import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {GeoForm} from './geoForm';
import { geoFormFileds} from './geoFormFields';
import {getState, updateState, getTimeAction} from '../../store/geoLocationSlice';


export function GeoLocater(){
  let dispatch = useAppDispatch();
  const getCurrentLocationAndTime = () => {
    let lattitude = 0, longitude = 0, timestamp = 0;
    navigator.geolocation.getCurrentPosition(function(position) {
      lattitude = position.coords.latitude;
      longitude = position.coords.longitude; 
      timestamp = position.timestamp
      dispatch(getTimeAction({lattitude, longitude}));
    });
    return {lattitude, longitude, timestamp}
  }

  useEffect(()=>{
    getCurrentLocationAndTime()
  },[])
const state = useAppSelector(getState);
  return (
   <div>
    <li>Time: {state.currentTime.time}</li>
    <li>Date: {state.currentTime.date}</li>
    <li>{state.city} {state.country}</li>
    <li>Lattitude: {state.lattitude}  Longitude: {state.longitude}</li>
    <GeoForm lattitude={state.lattitude} longitude={state.longitude} formFields={geoFormFileds}></GeoForm>
   </div>
  )
}


