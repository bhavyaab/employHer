import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import {getTimeZone, convertDateAndTime} from './apiCalls/getTime';
import { RootState } from './store';
import { useAppDispatch } from './hooks'

export const getTimeAction = createAsyncThunk(
  "geoLocaterState/getTimeZone",
  async (
    payload: { lattitude: number; longitude: number },
    { rejectWithValue }
  ) => {
      try {
          return await getTimeZone(payload.lattitude, payload.longitude);
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);
// const dispatch = useAppDispatch()
export const geoLocaterSlice = createSlice({
    name : 'geoLocaterState',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(getTimeAction.pending, (state) => {});
        builder.addCase(getTimeAction.fulfilled, (state, action: PayloadAction<any>) => {
            state = {...state, ...action.payload};
            state.currentTime = convertDateAndTime(action.payload.timestamp);
            return {...state};
        });
        builder.addCase( getTimeAction.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            state.currentTime = convertDateAndTime(action.payload.timestamp);
            return state;
          });
    }
});


export const getState = (state: RootState) => state.geoLocaterState;
export default geoLocaterSlice.reducer;