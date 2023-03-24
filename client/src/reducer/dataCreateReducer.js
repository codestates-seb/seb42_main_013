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
    setIDData : (state, action) => {
      state.detailSupplementId = action.payload.detailSupplementId
      state.supplementId= action.payload.supplementResponse.supplementId
    },
    setIsPatch : (state) => {
      state.isPatch = !state.isPatch
    },
    clearCreate : (state) => {
      state.isPatch= false
      state.supplementId= null
      state.detailSupplementId= null
      state.supplementType= "supplement"
      state.imageURL= ""
      state.supplementName= ""
      state.nutrients= []
      state.expirationDate= ""
      state.pillsLeft= ""
      state.totalCapacity= ""
      state.startDate= new Date().toISOString().substring(0, 10)
      state.endDate= ""
      state.dosageInterval= "1"
      state.takingTime= []
      state.dosagePerServing= 1
    }
  }
})

export const {setCreateData, setIsPatch, clearCreate, setIDData} = dataCreateSlice.actions
export default dataCreateSlice.reducer