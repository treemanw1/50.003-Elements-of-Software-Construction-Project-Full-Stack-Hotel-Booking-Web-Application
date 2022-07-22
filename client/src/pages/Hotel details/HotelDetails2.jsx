import "./HotelDetails.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";
import SearchItem from "../../components/searchItem/SearchItem";
import RoomItem from "../../components/roomItem/RoomItem";
import { roomList } from "./room_info.jsx";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const roomsPerRow = 5;

const HotelDetails = ({ name, address, status, imageUrl, handleBookNow }) => {
  var roomsLength = roomList[0].rooms.length;
  const [next, setNext] = useState(roomsLength);
  const location = useLocation();
  const coords = location.state.coords;

  const navigate = useNavigate();
  const handleBookButton = () => {
    navigate("/booking");
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBTdnh-tBXxLc2lwZJEFso2IWM30p6Nudw",
  });

  // cant figure out inserting api_key into process.env..., dm me for the api key
  console.log("api_key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  if (!isLoaded) return <div>Loading...</div>;

  const handleMoreImage = () => {
    setNext(next + roomsPerRow);
  };

  return (
    <div>
      <Navbar />
      <div className="hotelDetailsBackground">
        <Header />
        <div className="hotelDetailsResult">
          <div className="hotelDetailsWrapper">
            <img
              className="hdImg"
              src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/237415834.jpg?k=5d5c496b4c2844258a4c73e2c5013056ebf019f20d17228cd44050d4fcd2b73e&o="
              alt=""
            />
            <div className="hdDesc">
              <div className="hdTitle">The Fullerton Hotel</div>
              <div className="hdSubtitle">1 Fullerton Square, Singapore</div>
              <div>
                <Star rating={5}></Star>
              </div>
              <div class="hdInfo">
                <p>
                  With a stay at The Fullerton Hotel Singapore, you'll be
                  centrally located in Singapore, steps from Cavenagh Bridge and
                  Anderson Bridge. This 5-star hotel is close to Chinatown
                  Heritage Center and Universal Studios Singapore.
                </p>
                <br />
                <p>
                  Make yourself at home in one of the 400 individually furnished
                  guestrooms, featuring refrigerators and plasma televisions.
                  Complimentary wired and wireless Internet access keeps you
                  connected, and satellite programming provides entertainment.
                  Private bathrooms with separate bathtubs and showers feature
                  deep soaking bathtubs and complimentary toiletries.
                  Conveniences include phones, as well as laptop-compatible
                  safes and desks.
                </p>
              </div>
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
                crossOrigin="anonymous"
              ></link>
            </div>
          </div>
        </div>
        <div className="hotelRoomsContainer">
          <div className="hotelRoomsWrapper">
            <div className="hotelDetailsSearch">
              <div>
              <div><Map lat={coords[0]} lng={coords[1]}></Map></div>
              </div>
            </div>
            <div className="hotelRoomsResult">
              {roomList.map((data, key) => {
                return (
                  <div key={key}>
                    <RoomItem
                      key={key}
                      name={data["rooms"][key]["roomNormalizedDescription"]}
                      // address= {
                      //   data["rooms"][key + 3]["roomAdditionalInfo"][
                      //     "breakfastInfo"
                      //   ]
                      // }
                      imageUrl={data["rooms"][key]["images"][0]["url"]}
                      price={Math.round(
                        data["rooms"][key]["coverted_max_cash_payment"] * 3
                      )}
                      handleBookNow={handleBookButton}
                    />
                  </div>
                );
              })}
              {roomList.map((data, key) => {
                return (
                  <div key={key}>
                    <RoomItem
                      key={key}
                      name={data["rooms"][key + 3]["roomNormalizedDescription"]}
                      // address={
                      //   data["rooms"][key + 3]["roomAdditionalInfo"][
                      //     "breakfastInfo"
                      //   ] 
                      // }
                      imageUrl={data["rooms"][key + 3]["images"][0]["url"]}
                      price={Math.round(
                        data["rooms"][key + 3]["coverted_max_cash_payment"] * 3
                      )}
                      handleBookNow={handleBookButton}
                    />
                  </div>
                );
              })}
              {roomList.map((data, key) => {
                return (
                  <div key={key}>
                    <RoomItem
                      key={key}
                      name={data["rooms"][key + 5]["roomNormalizedDescription"]}
                      // address={
                      //   data["rooms"][key + 3]["roomAdditionalInfo"][
                      //     "breakfastInfo"
                      //   ]
                      // }
                      imageUrl={data["rooms"][key + 5]["images"][0]["url"]}
                      price={Math.round(
                        data["rooms"][key + 5]["coverted_max_cash_payment"] * 3
                      )}
                      handleBookNow={handleBookButton}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
