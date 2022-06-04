import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { initialState } from './initialState';
import {getTimeZone} from './apiCalls/getTime';

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
            return {...state, ...action.payload};
        });
        builder.addCase( getTimeAction.rejected, (state, action: PayloadAction<any>) => {
            state = { ...state, ...action.payload };
            return state;
          });
    }
});


export const getState = (state: RootState) => state.geoLocaterState;
export default geoLocaterSlice.reducer;