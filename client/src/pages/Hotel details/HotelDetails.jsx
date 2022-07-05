// A web page that displays more detailed hotel information and a list of all available 
// rooms for the selected hotel in Feature 2.
// A map that shows the hotel’s location (notice that the mock API will return the longitude 
// and latitude of the hotel in Appendix 3.3.4)
// Select button for each room option to redirect to Feature 4
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "../list/list.css"

import { useNavigate } from "react-router-dom";

const HotelDetails= () => {

    const navigate = useNavigate();

    const handleBookButton = () => {
        navigate("/hotels");
      };

    return (
      <div>
        <Navbar />
        <h1>Hotel Information</h1>
        <p>Filler text (also placeholder text or dummy text) is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. The process of using filler text is sometimes called greeking, although the text itself may be nonsense, or largely Latin, as in Lorem ipsum.</p>
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className='lsTitle'>Map</h1>
                </div>
                <div className="listResult">
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default HotelDetails;