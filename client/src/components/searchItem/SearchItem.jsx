import "./searchItem.css";


const SearchItem = ({name, address, distance, rating}) => {
  return (
    <div className="searchItem">
      <img
        src="https://static.wixstatic.com/media/77f58e_3ae21cb6dd5a4896a9a76906f6a6d958~mv2.png"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siSubtitle">
          {rating} stars
        </span>
        <span className="siSubtitle">
          {address}
        </span>
        <span className="siDistance">{Math.round(distance * 100) / 100} km from city centre</span>
        <span className="siFeatures">
          Show on map
        </span>
        
      </div>
      <div className="siDetails">
        
        <div className="siDetailTexts">
          <span className="siPrice">SGD 1360</span>
          <span className="roomDetails">1 room, 3 nights</span>
          <button className="siCheckButton">Select</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
