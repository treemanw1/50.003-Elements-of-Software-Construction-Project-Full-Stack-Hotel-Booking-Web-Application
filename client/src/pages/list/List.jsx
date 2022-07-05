import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { Button} from 'react-bootstrap';
import {hotelList} from './info.jsx';
const imagePerRow = 4;


const List = () => {
  const location = useLocation();
  const [next, setNext] = useState(imagePerRow);
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

