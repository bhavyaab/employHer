import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { getCoordinates } from './apiCalls/getCoordinates';
import {getTimeZone, convertDateAndTime} from './apiCalls/getTime';
import { RootState } from './store';


export const getCoordinatesAction = createAsyncThunk(
    'geoLocaterState/getCoordinates', async () => {
        const response = await getCoordinates();
        return response;
    }
);

export const getTimeAction = createAsyncThunk(
    'geoLocaterState/getTimeZone', async (payload: {lattitude: number, longitude: number}) => {
        const response = await getTimeZone(payload.lattitude, payload.longitude);
        return response;
    })

export const geoLocaterSlice = createSlice({
    name : 'geoLocaterState',
    initialState,
    reducers: { 
        updateState: (state, action: PayloadAction<any>) => {
            if(action.payload.lattitude) state.lattitude = action.payload.lattitude;
            if(action.payload.longitude) state.longitude = action.payload.longitude;
            if(action.payload.timeStamp) state.currentTime = convertDateAndTime(action.payload.timeStamp);
            if(action.payload.city) state.city = action.payload.city;
            return state;
         },
         updateTime: (state, action) => {
             state.currentTime = convertDateAndTime(action.payload.timeStamp);
             return state;
         }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getCoordinatesAction.pending, (state) => {
            return state;
        })
        .addCase(getCoordinatesAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.lattitude = action.payload.lattitude;
            state.longitude = action.payload.longitude;
            state.currentTime = convertDateAndTime(action.payload.timestamp);
            return state;
        })
        .addCase(getCoordinatesAction.rejected, (state) => {
            // 
            return state;
        })
        .addCase(getTimeAction.pending, (state) => {

        })
        .addCase(getTimeAction.fulfilled, (state, action: PayloadAction<any>) => {
            state = {...state, ...action.payload};
            state.currentTime = convertDateAndTime(action.payload.timestamp);
            return state;
        })
        .addCase(getTimeAction.rejected, (state) => {            
        })
    }
});


export const getState = (state: RootState) => state.geoLocaterState;

export const {updateState, updateTime} = geoLocaterSlice.actions;

export default geoLocaterSlice.reducer;