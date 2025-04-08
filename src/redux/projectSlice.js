import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "loaders",
  initialState: {
    projects:[],
    loading: false,
    buttonLoading: false,
  },
  reducers: {
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetButtonLoading: (state, action) => {
      state.buttonLoading = action.payload;
    },
  },
});

export const { SetLoading , SetButtonLoading} = projectSlice.actions;

export default projectSlice.reducer;
