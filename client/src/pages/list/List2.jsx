import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";
import SearchItem from "../../components/searchItem/SearchItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { hotelList } from "./info.jsx";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const imagePerRow = 7;
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [next, setNext] = useState(imagePerRow);
  const navigate = useNavigate();
  const handleBookButton = () => {
    navigate("/DestinationSearch");
  };
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBTdnh-tBXxLc2lwZJEFso2IWM30p6Nudw",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  // cant figure out inserting api_key into process.env..., dm me for the api key
  console.log("api_key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  if (!isLoaded) return <div>Loading...</div>;

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  const handleBookNow = () => {
    navigate("/HotelDetails");
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
                <Map></Map>
              </div>
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
              {hotelList?.slice(0, next)?.map((data, key) => {
                return (
                  <div key={key}>
                    <SearchItem
                      key={key}
                      name={data.name}
                      address={data.address}
                      distance={data.distance}
                      rating={data.rating}
                      price={1360}
                      handleBookNow={handleBookNow}
                    />
                  </div>
                );
              })}
              {next < hotelList?.length && (
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
