import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isPatch: false,
  supplementId: null,
  detailSupplementId: null,
  supplementType: "supplement",
  imageURL: "",
  supplementName: "",
  nutrients: [],
  expirationDate: "",
  pillsLeft: "",
  totalCapacity: "",
  startDate: new Date().toISOString().substring(0, 10),
  endDate: "",
  dosageInterval: "1",
  takingTime: [],
  dosagePerServing: 1,
}

const dataCreateSlice = createSlice({
  name: "data",
  initialState,
  reducers : {
    setCreateData : (state, action) => {
      state.detailSupplementId = action.payload.detailSupplementId
      state.supplementId= action.payload.supplementResponse.supplementId
      state.supplementType= action.payload.supplementResponse.supplementType
      state.imageURL= action.payload.supplementResponse.imageURL
      state.supplementName= action.payload.supplementResponse.supplementName
      state.nutrients= action.payload.supplementResponse.nutrients
      state.expirationDate= action.payload.expirationDate
      state.pillsLeft= action.payload.pillsLeft
      state.totalCapacity= action.payload.totalCapacity
      state.startDate= action.payload.startDate
      state.endDate= action.payload.endDate
      state.dosageInterval= action.payload.dosageInterval
      state.takingTime= action.payload.takingTime
      state.dosagePerServing= action.payload.dosagePerServing
    },
    setIsPatch : (state) => {
      state.isPatch = !state.isPatch
    }
  }
})

export const {setCreateData, setIsPatch} = dataCreateSlice.actions
export default dataCreateSlice.reducer