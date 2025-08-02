import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {},
});

export const { /* your actions here */ } = claimsSlice.actions;

export default claimsSlice.reducer;