import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({
  destinationValue,
  dateValue,
  adultsValue,
  childrenValue,
  roomValue,
}) => {
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
            <div className="textItem">
              <div className="subTextItem">DESTINATION</div>
              <div className="SearchItem">
                <input
                  data-testid="SearchBar"
                  type="text"
                  color="black"
                  className="headerSearchInput"
                  value={destinationValue}
                  disabled={true}
                />
              </div>
            </div>

            <div className="textItem">
              <div className="subTextItem">CHECKING DATES</div>
              <div className="SearchItem">
                <input
                  type="text"
                  color="black"
                  className="headerSearchInput"
                  value={dateValue}
                  disabled={true}
                />
              </div>
            </div>

            <div className="searchContainer">
              <div className="childSearchContainer">
                <div className="spaceItem"> ADULTS </div>
                <div className="countItem">
                  <input
                    type="text"
                    color="black"
                    className="headerSearchInput"
                    value={adultsValue}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="childSearchContainer">
                <div className="spaceItem"> CHILDREN </div>
                <div className="countItem">
                  <input
                    type="text"
                    color="black"
                    className="headerSearchInput"
                    value={childrenValue}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="childSearchContainer">
                <div className="spaceItem"> ROOMS </div>
                <div className="countItem">
                  <input
                    type="text"
                    color="black"
                    className="headerSearchInput"
                    value={roomValue}
                    disabled={true}
                  />
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
