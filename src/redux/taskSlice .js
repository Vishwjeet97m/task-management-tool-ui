import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    allUsers: [],
    notifications: [],
  },
  reducers: {
    SetUser(state, action) {
      state.user = action.payload;
    }
  },
});

export const { SetUser } = taskSlice.actions;

export default taskSlice.reducer;
