import { configureStore } from "@reduxjs/toolkit";
import dataCreateReducer from "../reducer/dataCreateReducer";
import searchReducer from "../reducer/searchReducer";
import concernReducer from "../reducer/concernReducer";



const store = configureStore({
  reducer: {
    searchReducer,
    concernReducer,
    create: dataCreateReducer,
  }
})

export default store;