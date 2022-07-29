// A web page that displays more detailed hotel information and a list of all available 
// rooms for the selected hotel in Feature 2.
// A map that shows the hotel’s location (notice that the mock API will return the longitude 
// and latitude of the hotel in Appendix 3.3.4)
// Select button for each room option to redirect to Feature 4
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import Map from "../../components/map/Map";
import "./HotelDetails.css"

import { useNavigate, useLocation } from "react-router-dom";

import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

const HotelDetails= () => {
    const navigate = useNavigate();
    const location = useLocation();
    const coords = location.state.coords;
    const hotelID = location.state.hotelID

    console.log("Coords (Details):", coords);
    console.log("hotelID:", hotelID);

    const handleBookButton = () => {
        navigate("/DestinationSearch");
      };

    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY});

    if (!isLoaded) return <div>Loading...</div>

    return (
        // <div>
        //     <Map/>
        // </div>
      <div>
        <Navbar />
        <h1 className="hotelDetails">Hotel Information</h1>
        {/* <img src="../../"></img> */}
        <p className="hotelDetails">Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum.</p>
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className='lsTitle'>Map</h1>
                    <div><Map lat={coords[0]} lng={coords[1]}></Map></div>
                </div>
                <div className="listResult">
                <SearchItem name="Grand Suite" address="123 Sesame Street" rating="5" onBookClick={handleBookButton}/>
                <SearchItem name="Crab Room" address="123 Fish Street" rating="5" onBookClick={handleBookButton}/>
                <SearchItem name="Broom Closet" address="23 Canal Road" rating="1" onBookClick={handleBookButton}/>
                </div>
            </div>
        </div>
      </div>
    );
  };

export default HotelDetails;