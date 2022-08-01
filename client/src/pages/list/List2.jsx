import axios from 'axios'
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";

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
    const hotelDisplay = [];
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
      console.log('pulling hotel data...')
      console.log(`http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`);
      axios // get general hotel info
          .get(`http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`)
          .then(response => {
          // console.log('general hotel info:');
          // console.log(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${uid}&checkin=${startDate}&checkout=${endDate}&guests=${options.adult}`);
          // console.log(`http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`);
          console.log('general hotel info retrieved');
          setHotels(response.data);
          })
      axios // get hotel price info
          .get(`http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`)
          .then(response => {
          // console.log('hotel pricing info:');
          // console.log(`http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`);
          console.log('hotel pricing data retrieved');
          setHotelPrices(response.data);
          })
      setLoading(false);
    }

    // getting hotel info from hotelPrices id (put in useEffect later, coniditonal display state empty, hjotels/hotepricings empty)
    const initializeHotelDisplay = () => {
      console.log("initialize hotel display");
      if (hotelDisplay.length===0 & hotels.length !==0 & hotelPrices.length!==0) {
        // console.log(hotelDisplay.length===0, hotels.length !==0, hotelPrices.length!==0);
        for (let i=0; i<hotelPrices.length; i++) {
          // if hotelPricing id exists in general info api
          if (hotels.find(e => e.id===hotelPrices[i].id) !== undefined) {
            let entry = hotels.find(e => e.id===hotelPrices[i].id)
            // console.log(entry);
            entry.lowest_price = hotelPrices[i].lowest_price
            hotelDisplay.push(entry);
          }
        }
      }
      console.log('hotel display:', hotelDisplay);
    }

    useEffect(pullHotelData, []);
    useEffect(initializeHotelDisplay, [hotelPrices])

 

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

            <HotelDisplay hotelDisplay={hotelDisplay} handleMoreImage={handleMoreImage}
              handleBookNow={(e) => {
                // console.log("Coords:", hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng);
                setCoords([hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng]);
                setHotelInfo({
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    rating: e.rating,
                    address: e.address
                })
                }}>
                </HotelDisplay>

            {/* <div className='listResult'>
              {hotelDisplay.length===0
                ? 'Loading...'
                : hotelDisplay.map((e, index) => {
                  return (
                    <div key={index}>
                      <SearchItem key={index} name={e.name} address={e.address} distance={e.distance}
                        rating={e.rating} price={e.lowest_price}
                        handleBookNow={() => {
                          // console.log("Coords:", hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng);
                          setCoords([hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng]);
                          setHotelInfo({
                            id: e.id,
                            name: e.name,
                            description: e.description,
                            rating: e.rating,
                            address: e.address
                          })
                          }
                        }/>
                    </div>
                  );})
              }
            </div> */}
            



            {/* <div className="listResult">
              Loading...
              {
                hotelDisplay.length === 0?
                "Loading..."
                :
                {hotelDisplay.map((e, index) => {
                return (
                  <div key={index}>
                    <SearchItem key={index} name={e.name} address={e.address} distance={e.distance}
                      rating={e.rating} price={e.lowest_price}
                      handleBookNow={() => {
                        // console.log("Coords:", hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng);
                        setCoords([hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng]);
                        setHotelInfo({
                          id: e.id,
                          name: e.name,
                          description: e.description,
                          rating: e.rating,
                          address: e.address
                        })
                        }
                      }/>
                  </div>
                );})}

              {next < hotels?.length && (
                <Button className="btn success" onClick={handleMoreImage}>
                  Load more
                </Button>
              )}
              }
            </div> */}



          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
