import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DestinationSearchPage from "./pages/Destination search page/DestinationSearchPage";
import HotelSearchPage from "./pages/Hotel search page/HotelSearchPage";
import HotelDetails from "./pages/Hotel details/HotelDetails";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DestinationSearchPage/>} />
        <Route path="/HotelSearch" element={<HotelSearchPage/>}/>
        <Route path="/HotelDetails" element={<HotelDetails/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
