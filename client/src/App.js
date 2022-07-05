import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DestinationSearchPage from "./pages/Destination search page/DestinationSearchPage";
import HotelSearchPage from "./pages/Hotel search page/HotelSearchPage";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import HotelDetails from "./pages/Hotel details/HotelDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/DestinationSearch" element={<DestinationSearchPage/>} />
        <Route path="/HotelSearch" element={<HotelSearchPage/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/HotelDetails" element={<HotelDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
