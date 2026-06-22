
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import App from './App.jsx'
import { Provider } from "react-redux"       
import store from "./store/store.js"  
import "bootstrap/dist/css/bootstrap.min.css" 
const router=createBrowserRouter([{
  path:"/",
  element:  <App />,
  children:[
    {path:"/",element:<Home/> },
    {path:"/login",element:<Login/>},
    {path:"/signup",element:<Register/>}
  
  ]
}])
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider>
   
  </StrictMode>,
)
