import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DestinationSearchPage from "./pages/Destination search page/DestinationSearchPage";
// import HotelSearchPage from "./pages/Hotel search page/HotelSearchPage";
import HotelDetails from "./pages/Hotel details/HotelDetails";
// import Hotel from "./pages/hotel/Hotel";
import Hotels from "./pages/Hotels/Hotels";

// import Navbar from "./components/Navbar"
import Book from "./pages/booking/Book";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserDetails from "./components/UserDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DestinationSearchPage />} />
        <Route path="/HotelDetails" element={<HotelDetails />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route exact path="/book" element={<Book />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/userdetails" element={<UserDetails />}></Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
