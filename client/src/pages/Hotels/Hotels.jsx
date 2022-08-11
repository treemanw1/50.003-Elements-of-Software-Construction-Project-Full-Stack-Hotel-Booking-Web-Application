import axios from "axios";
import "./hotels.css";
import loadable from "@loadable/component";
import Map from "../../components/map/Map";
import { render } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { Button } from "react-bootstrap";
const Navbar = loadable(() => import("../../components/navbar/Navbar"));
const Header = loadable(() => import("../../components/header/Header"));
const SearchItem = loadable(() =>
  import("../../components/searchItem/SearchItem")
);

const imagePerRow = 10;
const List = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [hotelPrices, setHotelPrices] = useState([]);
  const hotelTemp = [];
  const [hotelDisplay, setHotelDisplay] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // Data retrieved from Destination Search page via useLocation()
  const uid = location.state.uid;
  const [options, setOptions] = useState(location.state.options);
  const destinationCoords = location.state.destinationCoords;
  const destinationName = location.state.destinationName;

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

  const [next, setNext] = useState(imagePerRow);
  const navigate = useNavigate();
  const [coords, setCoords] = useState([0, 0]);

  const pullHotelData = () => {
    if ((hotels.length === 0) | (hotelPrices.length === 0)) {
      console.log("axios pulling all...");
      console.log(
        `http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`
      );
      console.log(
        `https://hotelapi.loyalty.dev/api/hotels?destination_id=${uid}&checkin=${startDate}&checkout=${endDate}&guests=${options.adult}`
      );
      console.log(
        `http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`
      );

      axios
        .all([
          axios.get(
            `http://localhost:3001/api/hotels/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`
          ),
          axios.get(
            `http://localhost:3001/api/hotelsPricing/destinationID/${uid}/${startDate}/${endDate}/${options.adult}`
          ),
        ])
        .then(
          axios.spread((hotelResponse, hotelPricingResponse) => {
            // console.log("RESPONSES:");
            // console.log(hotelResponse.data);
            // console.log(hotelPricingResponse.data);
            setHotelPrices(hotelPricingResponse.data);
            setHotels(hotelResponse.data);
          })
        )
        .catch((error) => console.log(error));
      setLoading(false);
    }
  };

  const initializeHotelDisplay = () => {
    console.log(
      "initializing hotel display:",
      hotelTemp.length === 0,
      hotels.length !== 0,
      hotelPrices.length !== 0
    );
    if (
      (hotelTemp.length === 0) &
      (hotels.length !== 0) &
      (hotelPrices.length !== 0)
    ) {
      for (let i = 0; i < hotelPrices.length; i++) {
        // if hotelPricing id exists in general info api
        if (hotels.find((e) => e.id === hotelPrices[i].id) !== undefined) {
          let entry = hotels.find((e) => e.id === hotelPrices[i].id);
          // console.log(entry);
          entry.lowest_price = hotelPrices[i].lowest_price;
          hotelTemp.push(entry);
        }
      }
      console.log("setting hotel display");
      setHotelDisplay(hotelTemp);
    }
  };

  useEffect(pullHotelData, [hotelPrices]);

  useEffect(initializeHotelDisplay, [hotelPrices]); // initialize when hotelPrices changes

  // console.log('hotel display:', hotelDisplay);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (coords[0] !== 0 && coords[1] !== 0)
      navigate("/HotelDetails", {
        state: { hotelInfo, uid, date, options, coords, destinationName },
      });
  }, [coords]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMoreImage = () => {
    setNext(next + imagePerRow);
  };

  render = () => {
    let rooms;
    if (loading) {
      rooms = <div>Loading...</div>;
    } else {
      rooms = <div>Loaded</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="listBackground">
        <Header
          destinationValue={destinationName}
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
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <div>
                <Map
                  lat={destinationCoords[0]}
                  lng={destinationCoords[1]}
                  zoom={12}
                ></Map>
              </div>
              {/* <div className="filter">
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
                  <Rating></Rating>
                </div>

                <div className="headerSearchItem1">
                  <div className="spaceItem">DISTANCE TO CENTER</div>
                  <Distance></Distance>
                </div>
              </div> */}
            </div>

            <div className="listResult">
              {hotelDisplay.length == 0 ? (
                <div class="loader"></div>
              ) : (
                <>
                  {hotelDisplay.slice(0, next)?.map((e, index) => {
                    return (
                      <div key={index}>
                        <SearchItem
                          key={index}
                          name={e.name}
                          address={e.address}
                          distance={e.distance}
                          rating={e.rating}
                          price={e.lowest_price}
                          imageUrl={
                            e.img_details.count === 0
                              ? "https://www.caspianpolicy.org/no-image.png"
                              : e.img_details.prefix +
                                e.img_index +
                                e.img_details.suffix
                          }
                          handleBookNow={() => {
                            // console.log("Coords:", hotels.filter(d => d.id==e.id)[0].lat, hotels.filter(d => d.id==e.id)[0].lng);
                            setCoords([
                              hotels.filter((d) => d.id == e.id)[0].lat,
                              hotels.filter((d) => d.id == e.id)[0].lng,
                            ]);
                            setHotelInfo({
                              id: e.id,
                              name: e.name,
                              description: e.description,
                              rating: e.rating,
                              address: e.address,
                              // img_link:
                              //   e.img_details.count === 0
                              //     ? "https://www.caspianpolicy.org/no-image.png"
                              //     : e.img_details.prefix +
                              //       e.img_index +
                              //       e.img_details.suffix,
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                  {next < hotels?.length && (
                    <div>
                      {/* {hotels.length <= imagePerRow ? (
                        <div>
                          Showing {hotels.length} results of {imagePerRow}{" "}
                          results
                        </div>
                      ) : (
                        <div>
                          Showing {next} results of {hotels.length} results
                        </div>
                      )} */}
                      <Button
                        data-testid="loadMoreBtn"
                        className="btn success"
                        onClick={handleMoreImage}
                      >
                        {hotels.length <= imagePerRow ? (
                          <div>
                            Showing {hotels.length} results of {imagePerRow}{" "}
                            results
                          </div>
                        ) : (
                          <div>
                            Showing {next} results of {hotels.length} results
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
