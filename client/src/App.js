import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DestinationSearchPage from "./pages/Destination search page/DestinationSearchPage";
// import HotelSearchPage from "./pages/Hotel search page/HotelSearchPage";
import HotelDetails from "./pages/Hotel details/HotelDetails";
// import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

// import Navbar from "./components/Navbar"
import Book from "./pages/booking/Book"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import UserDetails from "./components/UserDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DestinationSearchPage/>} />
        {/* <Route path="/HotelSearch" element={<HotelSearchPage/>}/> */}
        <Route path="/HotelDetails" element={<HotelDetails/>}/>
        <Route path="/hotels" element={<List/>}/>
        {/* <Route path="/hotels/:id" element={<Hotel/>}/> */}
        <Route exact path="/book" element={<Book/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/userdetails" element={<UserDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
