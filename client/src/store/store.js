import { configureStore } from "@reduxjs/toolkit";
import dataCreateReducer from "../reducer/dataCreateReducer";
import searchReducer from "../reducer/searchReducer";



const store = configureStore({
  reducer: {
    searchReducer,
    create: dataCreateReducer,
  }
})

export default store;