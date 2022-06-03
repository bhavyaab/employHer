import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import {getTimeZone, convertDateAndTime} from './apiCalls/getTime';
import { RootState } from './store';

export const getTimeAction = createAsyncThunk(
    'geoLocaterState/getTimeZone', async (payload: {lattitude: number, longitude: number}) => {
        const response = await getTimeZone(payload.lattitude, payload.longitude);
        return response;
    })

export const geoLocaterSlice = createSlice({
    name : 'geoLocaterState',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(getTimeAction.pending, (state) => {})
        .addCase(getTimeAction.fulfilled, (state, action: PayloadAction<any>) => {
            state = {...state, ...action.payload};
            state.currentTime = convertDateAndTime(action.payload.timestamp);
            return state;
        })
        .addCase(getTimeAction.rejected, (state) => {  
            console.log('rejected')          
        })
    }
});


export const getState = (state: RootState) => state.geoLocaterState;
export default geoLocaterSlice.reducer;