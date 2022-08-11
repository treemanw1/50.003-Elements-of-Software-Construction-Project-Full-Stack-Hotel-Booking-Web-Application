import "./HotelDetails.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Map from "../../components/map/Map";
import Star from "../../components/star/Star";
import SearchItem from "../../components/searchItem/SearchItem";
import RoomItem from "../../components/roomItem/RoomItem";
import { roomList } from "./room_info.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { Button } from "react-bootstrap";
const roomsPerRow = 5;

const HotelDetails = ({ name, address, status, imageUrl, handleBookNow }) => {
  var roomsLength = roomList[0].rooms.length;
  const [next, setNext] = useState(roomsPerRow);
  const location = useLocation();

  const coords = location.state.coords;
  const uid = location.state.uid;
  const [options, setOptions] = useState(location.state.options);
  const hotelInfo = location.state.hotelInfo;

  const [rooms, setRooms] = useState([]);

  // const [date, setDate] = useState(location.state.date);
  const date = location.state.date;

  let ye0 = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    date[0].startDate
  );
  let mo0 = new Intl.DateTimeFormat("en", { month: "numeric" }).format(
    date[0].startDate
  );
  let da0 = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    date[0].startDate
  );
  const startDate = `${ye0}-${mo0}-${da0}`;

  let ye1 = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    date[0].endDate
  );
  let mo1 = new Intl.DateTimeFormat("en", { month: "numeric" }).format(
    date[0].endDate
  );
  let da1 = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    date[0].endDate
  );
  const endDate = `${ye1}-${mo1}-${da1}`;

  const navigate = useNavigate();

  // const { state } = this.props.location;

  const pullRoomData = () => {
    if (rooms.length === 0) {
      console.log("hotelInfo:", hotelInfo);
      console.log("pulling room data...");
      console.log(
        `http://localhost:3001/api/rooms/${uid}/${hotelInfo.id}/${startDate}/${endDate}/${options.adult}`
      );
      axios // get general hotel info
        .get(
          `http://localhost:3001/api/rooms/${uid}/${hotelInfo.id}/${startDate}/${endDate}/${options.adult}`
        )
        .then((response) => {
          setRooms(response.data);
        });
    }
  };

  useEffect(pullRoomData, [rooms]);

  const handleBookButton = (roomInfo) => {
    navigate("/book", { state: { hotelInfo, roomInfo } });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  console.log("rooms:", rooms);

  const handleMoreImage = () => {
    setNext(next + roomsPerRow);
  };

  return (
    <div>
      <Navbar />
      <div className="hotelDetailsBackground">
        <div>
          <Header
            destinationValue={location.state.destinationName}
            dateValue={
              new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
              }).format(date[0].startDate) +
              " to " +
              new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
              }).format(date[0].endDate)
            }
            adultsValue={options.adult}
            childrenValue={options.children}
            roomValue={options.room}
          ></Header>
        </div>
        <div className="hotelDetailsResult">
          <div className="hotelDetailsWrapper">
            <img
              className="hdImg"
              src={hotelInfo.img_link}
              // src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/237415834.jpg?k=5d5c496b4c2844258a4c73e2c5013056ebf019f20d17228cd44050d4fcd2b73e&o="
              alt=""
            />
            <div className="hdDesc">
              <div className="hdTitle">{hotelInfo.name}</div>
              <div className="hdSubtitle">{hotelInfo.address}</div>
              <div>
                <Star rating={hotelInfo.rating}></Star>
              </div>

              <div
                class="hdInfo"
                dangerouslySetInnerHTML={{ __html: hotelInfo.description }}
              />
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
                <div>
                  <Map lat={coords[0]} lng={coords[1]} zoom={15}></Map>
                </div>
              </div>
            </div>

            <div className="hotelRoomsResult">
              {rooms.length == 0 ? (
                <div class="loader"></div>
              ) : (
                rooms.slice(0, next)?.map((e) => {
                  return (
                    <div key={e.key}>
                      <RoomItem
                        key={e.key}
                        name={e.name}
                        imageUrl={
                          e.img_link == undefined
                            ? "https://www.caspianpolicy.org/no-image.png"
                            : e.img_link.high_resolution_url == undefined
                            ? "https://www.caspianpolicy.org/no-image.png"
                            : e.img_link.high_resolution_url
                        }
                        price={e.price}
                        handleBookNow={() => handleBookButton(e)}
                      />
                    </div>
                  );
                })
              )}
              {next < rooms?.length && (
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

export default HotelDetails;
