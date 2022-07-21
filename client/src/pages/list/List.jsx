import axios from 'axios'
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { Button} from 'react-bootstrap';
import {hotelList} from './info.jsx'; // hardcoded data
const imagePerRow = 4;

const List = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);

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

  const [openDate, setOpenDate] = useState(false);
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
        console.log('promise fulfilled')
        setHotels(response.data)
      })
  }

  


  useEffect(pullHotelData, []);

  useEffect(() => {
    if (coords[0]!==0 && coords[1]!==0)
    navigate("/HotelDetails", { state: { coords } });
  }, [coords])

  console.log("hotels:", hotels);

  const handleMoreImage = () => {
      setNext(next + imagePerRow);
    };

  return (
    
    <div>
      <Navbar />
      <Header/>
      <div className="listContainer">
        <div className="listWrapper">
        <div className="listSearch">
              <h1 className="lsTitle">Map</h1>
              <div className="filterHeader">FILTER BY</div>

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
                  <div className="spaceItem">DISTANCE TO CENTER</div>
                  <div className="backgroundItem">
                    <label class="form-control">
                      <input type="checkbox" name="checkbox" />
                      Inside city center
                    </label>

                    <label class="form-control">
                      <input type="checkbox" name="checkbox-checked" />
                      less than 2 km to center
                    </label>

                    <label class="form-control">
                      <input type="checkbox" name="checkbox-checked" />
                      2-5 km to center
                    </label>

                    <label class="form-control">
                      <input type="checkbox" name="checkbox-checked" />
                      5-10 km to center
                    </label>

                    <label class="form-control">
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
                handleBookNow={() => {
                  console.log("Coords:", data.latitude, data.longitude);
                  setCoords([data.latitude, data.longitude]);
                }}
              />
            </div>
          );
        })}
        {next < hotelList?.length && (
          <Button
            className="btn success"
            onClick={handleMoreImage}>
            Load more
          </Button>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

