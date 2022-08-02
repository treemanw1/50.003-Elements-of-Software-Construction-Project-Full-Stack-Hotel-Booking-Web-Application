import axios from 'axios'
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";
import SearchItem from "../../components/searchItem/SearchItem";
import { Button } from "react-bootstrap";
import HotelDisplay from "../../components/hotelDisplay/HotelDisplay"

import { renderMatches, useLocation, useNavigate } from "react-router-dom";
import {render} from 'react-dom'
import { useState, useEffect } from "react";
import { hotelList } from "./info.jsx";
import { useLoadScript} from "@react-google-maps/api";

const imagePerRow = 7;
const List = () => {

    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const [hotelPrices, setHotelPrices] = useState([]);
    const hotelTemp = [];
    const [hotelDisplay, setHotelDisplay] = useState([])
    const [hotelInfo, setHotelInfo] = useState({});
    const [loading, setLoading] = useState(true);

    // Data retrieved from Destination Search page via useLocation()
    const uid = location.state.uid;
    const [options, setOptions] = useState(location.state.options);
    const destinationCoords = location.state.destinationCoords;

    const date = location.state.date;
    let ye0 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].startDate);
    let mo0 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].startDate);
    let da0 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].startDate);
    const startDate = `${ye0}-${mo0}-${da0}`;

    let ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date[0].endDate);
    let mo1 = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date[0].endDate);
    let da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date[0].endDate);
    const endDate = `${ye1}-${mo1}-${da1}`;


    const [next, setNext] = useState(imagePerRow);
    const navigate = useNavigate();
    const [coords, setCoords] = useState([0,0]);

    const pullHotelData = () => {
      if (hotels.length===0 | hotelPrices.length===0) {
        console.log("axios pulling all...");  
        console.log(`http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`);
        console.log(`http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`)
        axios.all([axios.get(`http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`),
          axios.get(`http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`)])
          .then(axios.spread((hotelResponse, hotelPricingResponse) => {
            console.log("RESPONSES:");
            console.log(hotelResponse.data);
            console.log(hotelPricingResponse.data);
            setHotelPrices(hotelPricingResponse.data);
            setHotels(hotelResponse.data);
          }))
        .catch(error => console.log(error));
        setLoading(false);
      }
    }
    
    const initializeHotelDisplay = () => {
      console.log("initializing hotel display:", hotelTemp.length===0, hotels.length !==0, hotelPrices.length!==0);
      if (hotelTemp.length===0 & hotels.length !==0 & hotelPrices.length!==0) {
        for (let i=0; i<hotelPrices.length; i++) {
          // if hotelPricing id exists in general info api
          if (hotels.find(e => e.id===hotelPrices[i].id) !== undefined) {
            let entry = hotels.find(e => e.id===hotelPrices[i].id)
            // console.log(entry);
            entry.lowest_price = hotelPrices[i].lowest_price
            hotelTemp.push(entry);
          }
        }
        console.log('setting hotel display');
        setHotelDisplay(hotelTemp);
      }
    }

    useEffect(pullHotelData, [hotelPrices]);
    
    useEffect(initializeHotelDisplay, [hotelPrices]) // initialize when hotelPrices changes

    // console.log('hotel display:', hotelDisplay);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    
    useEffect(() => {
    if (coords[0]!==0 && coords[1]!==0)
      navigate("/HotelDetails", { state: { hotelInfo, uid, date, options, coords } });
    }, [coords])

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleMoreImage = () => {
        setNext(next + imagePerRow);
    };

    render = () => {
      let rooms;
      if (loading) {
        rooms = <div>Loading...</div>
      }
      else {
        rooms = <div>Loaded</div>
      }
    }
    
  return (
    <div>
      <Navbar />
      <div className="listBackground">
        <Header />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <div>
                <Map lat={destinationCoords[0]} lng={destinationCoords[1]} zoom={12}></Map>
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
              { hotelDisplay.length == 0
              ? <div class="loader"></div>
              :<>{hotelDisplay.map((e, index) => {
                return (
                  <div key={index}>
                    <SearchItem
                      key={index}
                      name={e.name}
                      address={e.address}
                      distance={e.distance}
                      rating={e.rating}
                      price={e.lowest_price}
                      imageUrl={e.img_details.count === 0
                        ? "https://assets3.thrillist.com/v1/image/1144882/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg"
                        : e.img_details.prefix+e.img_index+e.img_details.suffix}
                      handleBookNow={() => {
                        // console.log("Coords:", hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng);
                        setCoords([hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng]);
                        setHotelInfo({
                          id: e.id,
                          name: e.name,
                          description: e.description,
                          rating: e.rating,
                          address: e.address,
                          img_link: e.img_details.count === 0
                          ? "https://assets3.thrillist.com/v1/image/1144882/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg"
                          : e.img_details.prefix+e.img_index+e.img_details.suffix
                        })
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
              </>              
              }  
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
