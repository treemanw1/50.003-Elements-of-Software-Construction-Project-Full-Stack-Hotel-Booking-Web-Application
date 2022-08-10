import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ destinationValue }) => {
  const [destination, setDestination] = useState("");
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

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      <div>
        <div className="headerContainer">
          <div class="childHeaderContainer">
            <div className="destinationItem">
              <div className="textItem">DESTINATION</div>
              <div className="destinationSearchItem">
                <input
                  data-testid="SearchBar"
                  type="text"
                  color="black"
                  placeholder="Enter Destination"
                  className="headerSearchInput"
                  value={destinationValue}
                  disabled={true}
                />
              </div>
            </div>

            <div className="textItem">
              <div className="textItem">CHECK-IN CHECK-OUT DATES</div>
              <div className="dateItem">
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="dateItem"
                >{`${format(date[0].startDate, "MMM dd, yyyy")} to ${format(
                  date[0].endDate,
                  "MMM dd, yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
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
                <div className="spaceItem"> ADULTS </div>
                <div className="countItem">
                  <span
                    data-testid="adult-span-header"
                    onClick={() => setOpenOptions(!openOptions)}
                    className="countItem"
                  >{`${options.adult}`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adults</span>
                        <div className="optionCounter">
                          <button
                            data-testid="adult-minus-header"
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
                            data-testid="adult-plus-header"
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
                <div className="spaceItem"> CHILDREN </div>
                <div className="countItem">
                  <span
                    data-testid="children-span-header"
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
                            data-testid="children-minus-header"
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
                            data-testid="children-plus-header"
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
                <div className="spaceItem"> ROOMS </div>
                <div className="countItem">
                  <span
                    data-testid="rooms-span-header"
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
                            data-testid="rooms-minus-header"
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
                            data-testid="rooms-plus-header"
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
            <div className="updateItem">
              <button
                data-testid="modifySearchBtn"
                className="searchBtn"
                onClick={handleSearch}
              >
                Modify Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
