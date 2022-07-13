import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { Button} from 'react-bootstrap';
import {hotelList} from './info.jsx';
const imagePerRow = 4;


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [next, setNext] = useState(imagePerRow);
  const navigate = useNavigate();

const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

const handleBookNow = () => {
    navigate("/HotelDetails");
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
                      onChange={(e) => setDestination(e.target.value)}
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
          {hotelList?.slice(0, next)?.map((data, key) => {
          return (
            <div key={key}>
              <SearchItem
                key={key}
                name={data.name}
                address={data.address}
                distance={data.distance}
                rating={data.rating}
                handleBookNow={handleBookNow}
              />
            </div>
          );
        })}
        {next < hotelList?.length && (
          <Button
            className="btn success"
            onClick={handleMoreImage}
          >
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

