import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { getCoordinates } from './apiCalls/getCoordinates';
import {convertDateAndTime} from './apiCalls/getTime';
import { RootState } from './store';


export const getCoordinatesAction = createAsyncThunk(
    'geoLocaterState/getCoordinates', async () => {
        const response = await getCoordinates();
        return response;
    }
)

export const geoLocaterSlice = createSlice({
    name : 'geoLocaterState',
    initialState,
    reducers: { 
        updateLatLong: (state, action: PayloadAction<any>) => {
            state.lattitude = action.payload.lat;
            state.longitude = action.payload.long;
            if(action.payload.timeStamp) state.currentTime = convertDateAndTime(action.payload.timeStamp);
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
            // 
            return state;
        })
        .addCase(getCoordinatesAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.lattitude = action.payload.lat;
            state.longitude = action.payload.long;
            state.currentTime = convertDateAndTime(action.payload.timeStamp);
            return state;
        })
        .addCase(getCoordinatesAction.rejected, (state) => {
            // 
            return state;
        })
    }
});


export const getState = (state: RootState) => state.geoLocaterState;

export const {updateLatLong} = geoLocaterSlice.actions;

export default geoLocaterSlice.reducer;