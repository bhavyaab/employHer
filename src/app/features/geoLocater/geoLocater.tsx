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
    getCurrentLocationAndTime();
  },[])
const state = useAppSelector(getState);
let { currentTime, city, country, lattitude, longitude, status, message } = state;
  return (
   <div className='geoLocater'>
    <div className='time'>{currentTime.time}</div>
    <div className={status == 'OK'? 'date': 'date errorMessage'}>{status == 'OK'? currentTime.date: message}</div>
    <div className='place'>{city} {status == 'OK'? <div className='secondInfo'>( {country} )</div>:<></> }</div>
    <div className='latLong'>Lattitude: {lattitude} <div className='secondInfo'> Longitude: {longitude}</div></div>
    <GeoForm lattitude={lattitude} longitude={longitude} formFields={geoFormFileds}></GeoForm>
   </div>
  )
}

