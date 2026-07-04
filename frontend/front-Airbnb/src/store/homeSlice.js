import {createSlice} from "@reduxjs/toolkit"
const homeSlice=createSlice({
name :"homes",
initialState:{
  registeredHomes:[],
  myOwnHomes:[],
  favouriteHomes:[],
  loading:true
},
reducers:{
  fetchHomeStart(state){
    state.loading=true
  },
  fetchHomeSuccess(state,action){
    state.registeredHomes=action.payload;
    state.loading =false
  },
  fetchHomeFaliure(state){
    state.loading=false
  },
  fetchmyHomeSuccess(state,action){
    state.myOwnHomes=action.payload;
    state.loading=false
  },
  fetchmyFavouriteHomesSucess(state,action){
    state.favouriteHomes=action.payload;
    state.loading=false;
  }
}

})
export const {fetchHomeStart,fetchHomeSuccess,fetchHomeFaliure,fetchmyHomeSuccess,fetchmyFavouriteHomesSucess}=homeSlice.actions;
export default homeSlice.reducer;