import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  supplementId: null,
  type: "supplement",
  imageURL: null,
  supplementName: "",
  nutrients: [],
  expirationDate: "",
  pillsLeft: "",
  totalCapacity: "",
  startDate: new Date().toISOString().substring(0, 10),
  endDate: "",
  dosageInterval: 1,
  takingTime: [],
  dosagePerServing: 1,
}

const dataCreateSlice = createSlice({
  name: "data",
  initialState,
  reducers : {
    setCreateData : (state, action) => {
      state.supplementId= action.payload.supplementId
      state.type= action.payload.type
      state.imageURL= action.payload.imageURL
      state.supplementName= action.payload.supplementName
      state.nutrients= action.payload.nutrients
      state.expirationDate= action.payload.expirationDate
      state.pillsLeft= action.payload.pillsLeft
      state.totalCapacity= action.payload.totalCapacity
      state.startDate= action.payload.startDate
      state.endDate= action.payload.endDate
      state.dosageInterval= action.payload.dosageInterval
      state.takingTime= action.payload.takingTime
      state.dosagePerServing= action.payload.dosagePerServing
    }
  }
})

export const {setCreateData} = dataCreateSlice.actions
export default dataCreateSlice.reducer