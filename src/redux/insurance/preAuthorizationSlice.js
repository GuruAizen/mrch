import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCashlessFormData: [],
};
const preAuthorizationSlice = createSlice({
  name: "preAuth",
  initialState,
  reducers: {
    setFilteredCashlessFormData: (state, action) => {
      state.filteredCashlessFormData = action.payload;
    },
  },
});

export const { setFilteredCashlessFormData } = preAuthorizationSlice.actions;

export default preAuthorizationSlice.reducer;
