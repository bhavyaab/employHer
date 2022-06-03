import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import {GeoForm} from './geoForm';
import { geoFormFileds} from './geoFormFields';
import {getState, getTimeAction} from '../../../store/geoLocationSlice';


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
    <div className='time'>{state.currentTime.time}</div>
    <div className='date'>{state.currentTime.date}</div>
    <div className='place'>{state.city} <div className='secondInfo'>( {state.country} )</div> </div>
    <div className='latLong'>Lattitude: {state.lattitude} <div className='secondInfo'> Longitude: {state.longitude}</div></div>
    <GeoForm lattitude={state.lattitude} longitude={state.longitude} formFields={geoFormFileds}></GeoForm>
   </div>
  )
}


