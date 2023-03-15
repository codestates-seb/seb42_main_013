import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducer/searchReducer";



const store = configureStore({
  reducer: {
    searchReducer
  }
})

export default store;