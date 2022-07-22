import axios from 'axios'
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";
import SearchItem from "../../components/searchItem/SearchItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { hotelList } from "./info.jsx";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const imagePerRow = 7;
const List = () => {
//   const location = useLocation();
//   const [destination, setDestination] = useState(location.state.destination);
//   const [openDate, setOpenDate] = useState(false);
//   const [next, setNext] = useState(imagePerRow);
//   const navigate = useNavigate();

//   const uid = location.state.uid;
  
//   // const [date, setDate] = useState(location.state.date);
//   const date = location.state.date;

//   let ye0 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].startDate);
//   let mo0 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].startDate);
//   let da0 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].startDate);
//   const startDate = `${ye0}-${mo0}-${da0}`;

//   let ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].endDate);
//   let mo1 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].endDate);
//   let da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].endDate);
//   const endDate = `${ye1}-${mo1}-${da1}`;

//   // const [openDate, setOpenDate] = useState(false);
//   const [options, setOptions] = useState(location.state.options);

//   const handleBookButton = () => {
//     navigate("/DestinationSearch");
//   };
//   const { isLoaded } = useLoadScript({
//     // googleMapsApiKey: "AIzaSyBTdnh-tBXxLc2lwZJEFso2IWM30p6Nudw",
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });
//   // cant figure out inserting api_key into process.env..., dm me for the api key
//   console.log("api_key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
//   if (!isLoaded) return <div>Loading...</div>;

//   const handleMoreImage = () => {
//     setNext(next + imagePerRow);
//   };

//   const handleBookNow = () => {
//     navigate("/HotelDetails");
//   };

    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const [hotelIds, setHotelIds] = useState([]);
    const [hotelPrices, setHotelPrices] = useState([]);

    const uid = location.state.uid;

    // const [date, setDate] = useState(location.state.date);
    const date = location.state.date;

    let ye0 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].startDate);
    let mo0 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].startDate);
    let da0 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].startDate);
    const startDate = `${ye0}-${mo0}-${da0}`;

    let ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].endDate);
    let mo1 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].endDate);
    let da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].endDate);
    const endDate = `${ye1}-${mo1}-${da1}`;

    // const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);

    const [next, setNext] = useState(imagePerRow);
    const navigate = useNavigate();
    const [coords, setCoords] = useState([0,0]);

    // console.log("UID:", uid);
    // console.log("dates:");
    // console.log(startDate);
    // console.log(endDate);
    console.log("options:", options);

    const pullHotelData = () => {
    console.log('pulling hotel data...')
    axios
        .get(`http://localhost:3001/api/hotels/${uid}/${startDate}/${endDate}/${options.adult}`)
        .then(response => {
        console.log('promise fulfilled');
        setHotels(response.data);
        // setHotelIds(response.data.map(d => d.id));
        })
    }

    const pullHotelPricingData = () => {
    console.log("pulling pricing data...");
    // async function fetchData() {
        for (let i=0; i<hotelIds.length; i++) {
        axios
            .get(`http://localhost:3001/api/hotels/prices/${uid}/${hotelIds[i]}/${startDate}/${endDate}/${options.adult}`)
            .then(response => {
            let updated = hotelPrices.concat(response.data);
            setHotelPrices(updated);
            })
        }
    // }
    // fetchData();
    }

    useEffect(pullHotelData, []);
    // useEffect(pullHotelPricingData, []);

    console.log("hotels:", hotels);
    // console.log("hotel Ids:", hotelIds);
    // console.log("hotelPrices", hotelPrices);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    
    useEffect(() => {
    if (coords[0]!==0 && coords[1]!==0)
    navigate("/HotelDetails", { state: { coords } });
    }, [coords])

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleMoreImage = () => {
        setNext(next + imagePerRow);
    };

  return (
    <div>
      <Navbar />
      <div className="listBackground">
        <Header />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <div>
                <Map lat={44} lng={-80}></Map>
              </div>
              <div className="filter">
                <div className="headerSearchItem1">
                  <div className="spaceItem">HOTEL NAME</div>
                  <div className="filterSearchInput">
                    <input
                      type="text"
                      placeholder="Search Hotel Name or Brand"
                      className="headerSearchInput"
                      // onChange={(e) => setDestination(e.target.value)}
                      onChange={() => console.log("onChange")}
                    />
                  </div>
                </div>

                <div className="headerSearchItem1">
                  <div className="spaceItem">RATING</div>
                  <div className="backgroundItem">
                    <label class="form-group-rating">
                      <input type="checkbox" name="checkbox" />
                      <div>
                        <Star rating={5}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={4}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={3}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={2}></Star>
                      </div>
                    </label>

                    <label class="form-group-rating">
                      <input type="checkbox" name="checkbox-checked" />
                      <div>
                        <Star rating={1}></Star>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="headerSearchItem1">
                  <div className="spaceItem">DISTANCE TO CENTER</div>
                  <div className="backgroundItem">
                    <label class="form-group">
                      <input type="checkbox" name="checkbox" />
                      Inside city center
                    </label>

                    <label class="form-group">
                      <input type="checkbox" name="checkbox-checked" />
                      less than 2 km to center
                    </label>

                    <label class="form-group">
                      <input type="checkbox" name="checkbox-checked" />
                      2-5 km to center
                    </label>

                    <label class="form-group">
                      <input type="checkbox" name="checkbox-checked" />
                      5-10 km to center
                    </label>

                    <label class="form-group">
                      <input type="checkbox" name="checkbox-checked" />
                      more than 10 km to center
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="listResult">
              {hotels?.slice(0, next)?.map((data, key) => {
                return (
                  <div key={key}>
                    <SearchItem
                      key={key}
                      name={data.name}
                      address={data.address}
                      distance={data.distance}
                      rating={data.rating}
                      price={1360}
                      handleBookNow={() => {
                        console.log("Coords:", data.latitude, data.longitude);
                        setCoords([data.latitude, data.longitude]);
                      }}
                    />
                  </div>
                );
              })}
              {next < hotels?.length && (
                <Button className="btn success" onClick={handleMoreImage}>
                  Load more
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
