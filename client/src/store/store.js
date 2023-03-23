import { configureStore } from "@reduxjs/toolkit";
import dataCreateReducer from "../reducer/dataCreateReducer";
import searchReducer from "../reducer/searchReducer";
import concernReducer from "../reducer/concernReducer";
import loginInfoReducer from "../reducer/loginInfoReducer";



const store = configureStore({
  reducer: {
    searchReducer,
    concernReducer,
    loginInfoReducer,
    create: dataCreateReducer,
  }
})

export default store;