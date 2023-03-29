import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  login : JSON.parse(sessionStorage.getItem("login")) === null ? false : JSON.parse(sessionStorage.getItem("login")),
  userInfo : JSON.parse(sessionStorage.getItem("userInfo")) === null ? {} : JSON.parse(sessionStorage.getItem("userInfo"))
};

const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState,
  reducers: {
    changeLoginInfo: (state, action) => {
      sessionStorage.setItem("login", JSON.stringify(action.payload.login));
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      state.login = JSON.parse(sessionStorage.getItem("login"));
      state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    },
  }
})

export const loginInfoActions = loginInfoSlice.actions
export default loginInfoSlice.reducer