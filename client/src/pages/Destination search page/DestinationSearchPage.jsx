
import React from 'react';
import "./DestinationSearchPage.css";
import loadable from '@loadable/component'
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
const Navbar = loadable(() => import('../../components/navbar/Navbar')) 
const Single = loadable(() => import('../../components/single/Single')) 



const Home = ({ type }) => {
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [filterPhrase, setFilterPhrase] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // send data to /hotels path in single object state
  const [hotelsData, setHotelsData] = useState({});

  const [destinationCoords, setDestinationCoords] = useState([0, 0]);

  // states governing options displayed in CreatableSingle
  const [destinationData, setDestinationData] = useState([]);
  const [noFilteredDestinations, setNoFilteredDestinations] = useState(100);
  const [checkSubmitButton, setCheckSubmitButton] = useState(0);

  let dropdownDisplay =
    noFilteredDestinations > 50
      ? [] // > 50
      : destinationData.filter((d) =>
          d.value.toLowerCase().includes(filterPhrase)
        ); // < 50 

  // pull data from /api/destinations
  useEffect(() => {
    setNoFilteredDestinations(100);
    axios.get("http://localhost:3001/api/destinations").then((response) => {
      //console.log("data retrieved");
      setDestinationData(response.data);
    });
  }, []);

  // console.log("destinationData:", destinationData);
 // console.log("noFilteredDestinations: ", noFilteredDestinations);
  //console.log("dropdownDisplay:", dropdownDisplay);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    checkSubmitButton != 2
      ? window.alert("Input DESTINATION and CHECK-IN CHECK-OUT DATES!")
      : navigate("/hotels", {
          state: { uid, date, options, destinationCoords },
        });
  };

  const handleSubmit = (item) => {
    setDate([item.selection]);
    setCheckSubmitButton(2);
  };

  // sets destination phrase
  const handleInputChange = (phrase) => {
    setNoFilteredDestinations(
      destinationData.filter((d) => d.value.toLowerCase().includes(phrase))
        .length
    );
    setFilterPhrase(phrase);
  };

  return (
    <React.Fragment>
      <Navbar />
      {/* <Test/>  */}
      <div className="homeContainer">
        <div class="childHomeContainer">
          <div className="question">
            <div data-testid="Where" class="text">
              Where
            </div>
            <div data-testid="are you" class="text">
              are you
            </div>
            <div data-testid="travelling to?" class="text">
              travelling to?
            </div>
          </div>
          <div className="search">
            <div className="headerSearchItem1">
              <div data-testid="DESTINATION" className="spaceItem">
                DESTINATION
              </div>
              <Single
                options={dropdownDisplay}
                onInputChange={handleInputChange}
                onChange={(newValue) => {
                  setUid(newValue.uid);
                  setDestinationCoords([newValue.lat, newValue.lng]);
                  setCheckSubmitButton(1);
                }} // activates when selecting destination
              />
            </div>

            <div className="spaceItem">
              <div data-testid="checkin" className="spaceItem">
                CHECK-IN CHECK-OUT DATES
              </div>
              <div className="dateItem">
                <span
                  data-testid="date-span"
                  onClick={() => setOpenDate(!openDate)}
                  className="dateItem"
                >
                  {`${format(date[0].startDate, "MMM dd, yyyy")} to ${format(
                    date[0].endDate,
                    "MMM dd, yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    data-testid="DateRange"
                    editableDateInputs={true}
                    onChange={handleSubmit}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
            </div>

            <div className="searchContainer">
              <div className="childSearchContainer">
                <div data-testid="ADULTS" className="spaceItem">
                  {" "}
                  ADULTS{" "}
                </div>
                <div data-testid="count" className="countItem">
                  <span
                    data-testid="adult-span"
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                  >{`${options.adult}`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adults</span>
                        <div className="optionCounter">
                          <button
                            data-testid="adult-minus"
                            disabled={options.adult <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.adult}
                          </span>
                          <button
                            data-testid="adult-plus"
                            disabled={options.adult >= 50}
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="childSearchContainer">
                <div data-testid="CHILDREN" className="spaceItem">
                  {" "}
                  CHILDREN{" "}
                </div>
                <div className="countItem">
                  <span
                    data-testid="children-span"
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                    // {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                  >{`${options.children}`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button
                            data-testid="children-minus"
                            disabled={options.children <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.children}
                          </span>
                          <button
                            data-testid="children-plus"
                            disabled={options.children >= 50}
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="childSearchContainer">
                <div data-testid="ROOMS" className="spaceItem">
                  {" "}
                  ROOMS{" "}
                </div>
                <div className="countItem">
                  <span
                    data-testid="rooms-span"
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                  >
                    {`${options.room}`}
                  </span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Rooms</span>
                        <div className="optionCounter">
                          <button
                            data-testid="rooms-minus"
                            disabled={options.room <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.room}
                          </span>
                          <button
                            data-testid="rooms-plus"
                            disabled={options.room >= 25}
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="checkItem">
              <button
                data-testid="SearchBtn"
                className="searchButton"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <Link
              to={{
                pathname: "/hotels",
                state: 'Singapore',
              }}
            >
            </Link>
          </div>
        </div>
      </div>
   
    </React.Fragment>
  );
};

export default Home;
