import {createSlice} from "@reduxjs/toolkit"
const authSlice =createSlice({
  name:"auth",
  initialState:{
    user:null,
    isLoggedIn:false,
   isChecking: true
  },
  reducers:{
    login(state,action){
      state.user=action.payload
      state.isLoggedIn=true
      state.isChecking=false; 
      },
    logout(state){
      state.user=null
      state.isLoggedIn=false,
      state.isChecking = false;

    },
    stopChecking(state) {
    state.isChecking = false; 
  }
  }

 })


 export const {login,logout,stopChecking} =authSlice.actions
 export default  authSlice.reducer

