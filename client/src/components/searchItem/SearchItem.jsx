import "./searchItem.css";

const SearchItem = ({name, address, distance, rating, handleBookNow}) => {
  return (
    <div className="searchItem">
      <img
        src="https://static.wixstatic.com/media/77f58e_3ae21cb6dd5a4896a9a76906f6a6d958~mv2.png"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siSubtitle">{address}</span>
        <span className="siSubtitle">
          {rating} stars
        </span>

        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>
        <button className="siFeatures">
          <i class="fas fa-location-arrow fa-fw"></i> Show on Map
        </button>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">SGD 1360</span>
          <span className="roomDetails">1 room, 3 nights</span>
        </div>
        <button className="siCheckButton" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default SearchItem;
