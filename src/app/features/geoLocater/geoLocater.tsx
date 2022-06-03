import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {GeoForm} from './geoForm';
import { geoFormFileds} from './geoFormFields';
import {getState, getTimeAction} from '../../store/geoLocationSlice';


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
// eslint-disable-next-line
  useEffect(()=>{
    getCurrentLocationAndTime()
  },[])
const state = useAppSelector(getState);
  return (
   <div className='geoLocater'>
    <li className='time'>{state.currentTime.time}</li>
    <li className='date'>{state.currentTime.date}</li>
    <li className='place'>{state.city} <li className='secondInfo'>( {state.country} )</li> </li>
    <li className='latLong'>Lattitude: {state.lattitude} <li className='secondInfo'> Longitude: {state.longitude}</li></li>
    <GeoForm lattitude={state.lattitude} longitude={state.longitude} formFields={geoFormFileds}></GeoForm>
   </div>
  )
}


