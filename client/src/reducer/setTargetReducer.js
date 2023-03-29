import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {
  id: null}

const setTargetSlice = createSlice({
  name: 'setTarget',
  initialState,
  reducers: {
    setTargetId: (state, action) => {
      state.id = action.payload;
    }
  }
})

export const {setTargetId} = setTargetSlice.actions
export default setTargetSlice.reducer