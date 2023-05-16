import { createSlice } from '@reduxjs/toolkit';

export interface MaexState {}

const initialState: MaexState = {};

export const maexSlice = createSlice({
  initialState,
  name: 'maex',
  reducers: {},
});

// export const { todo } =
//   maexSlice.actions;
//
export default maexSlice.reducer;
