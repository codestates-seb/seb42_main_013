import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {searchValue: JSON.parse(localStorage.getItem("searchValue")) === null ? "" : JSON.parse(localStorage.getItem("searchValue"))};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      localStorage.setItem("searchValue", JSON.stringify(action.payload.data));
      state.searchValue = JSON.parse(localStorage.getItem("searchValue"));
    },
    removeSearchValue: (state, action) => {
      localStorage.removeItem("searchValue");
      state.searchValue = "";
    }
  }
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer