import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://static.wixstatic.com/media/77f58e_3ae21cb6dd5a4896a9a76906f6a6d958~mv2.png"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Shangri-La Singapore</h1>
        <span className="siSubtitle">
          22 Orange Grove 
        </span>
        <span className="siDistance">14.4 km from city centre</span>
        
        
        <span className="siFeatures">
          Show on map
        </span>
        
      </div>
      <div className="siDetails">
        
        <div className="siDetailTexts">
          <span className="siPrice">SGD 1360</span>
          <span className="roomDetails">1 room, 3 nights</span>
          <button className="siCheckButton">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
