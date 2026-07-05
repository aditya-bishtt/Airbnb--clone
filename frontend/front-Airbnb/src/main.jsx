import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Addhome from "./pages/Add-Home.jsx"
import 'leaflet/dist/leaflet.css';
import App from './App.jsx'
import { Provider } from "react-redux"       
import store from "./store/store.js"  
import ProtectedRoute, { GuestOnlyRoute } from "./components/Protected.jsx"
import NotFound from "./pages/error.jsx"
import api from "./api/axios"  
import "bootstrap/dist/css/bootstrap.min.css" 
import HostHome from "./pages/Host-Home.jsx"
import HomeDetails from "./pages/Home-details.jsx"
import FavouriteHomes from "./pages/favouritesHome.jsx"
import MyBookings from "./pages/booking.jsx"


api.defaults.withCredentials = true

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = "/login"
    }
    if (error.response?.status === 403) {
      window.location.href = "/"
    }
    return Promise.reject(error)
  }
)

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/login", element: <GuestOnlyRoute><Login /></GuestOnlyRoute> },
{ path: "/signup", element: <GuestOnlyRoute><Register /></GuestOnlyRoute> },
    { path: "/details/:id", element: <HomeDetails /> },
    { path: "/mybookings", element: <MyBookings /> },
    { 
      path: "/host/add-home", 
      element: <ProtectedRoute allowedType="host"><Addhome /></ProtectedRoute>
    },
    { 
      path: "/host/myhomes", 
      element: <ProtectedRoute allowedType="host"><HostHome /></ProtectedRoute>
    },
    { 
      path: `/host/edit-home/:id`, 
      element: <ProtectedRoute allowedType="host"><Addhome /></ProtectedRoute>
    },
    { 
      path: "/favourites", 
      element: <ProtectedRoute allowedType="guest"><FavouriteHomes /></ProtectedRoute>
    },
    { path: "*", element: <NotFound /> }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)