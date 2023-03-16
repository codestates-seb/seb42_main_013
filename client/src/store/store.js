import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducer/searchReducer";
import concernReducer from "../reducer/concernReducer";



const store = configureStore({
  reducer: {
    searchReducer,
    concernReducer
  }
})

export default store;