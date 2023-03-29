import { createSlice } from "@reduxjs/toolkit";
// 이렇게 설정하면 tag빼고는 보존이 가능
let initialState = {selectedConcern: 1};

const concernSlice = createSlice({
  name: 'concern',
  initialState,
  reducers: {
    changeConcernClicked: (state, action) => {
      state.selectedConcern = action.payload.data;
    }
  }
})

export const concernActions = concernSlice.actions
export default concernSlice.reducer