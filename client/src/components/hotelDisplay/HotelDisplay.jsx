import SearchItem from "../searchItem/SearchItem";
import { Button } from "react-bootstrap";

const HotelDisplay = ({hotelDisplay, handleBookNow, handleMoreImage}) => {
    return (
        <div className="listResult">
            {hotelDisplay.map((e, index) => {
                return (
                <div key={index}>
                    <SearchItem key={index} name={e.name} address={e.address} distance={e.distance}
                    rating={e.rating} price={e.lowest_price}
                    handleBookNow={handleBookNow(e)}/>
                </div>
            );})}
            <Button className="btn success" onClick={handleMoreImage}>
                Load more
            </Button>
        </div>
    )
}

export default HotelDisplay;