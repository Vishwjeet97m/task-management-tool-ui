import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects : projectReducer,
  },
});

export default store;
