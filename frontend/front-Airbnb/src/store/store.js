import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import homesReducer from "./homeSlice"


const store=configureStore({
  reducer:{
    auth :authReducer,
    homes:homesReducer
  }
})
export default store