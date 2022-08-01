import "./searchItem.css";
import Star from "../../components/star/Star";

const SearchItem = ({
  // imageUrl,
  name,
  // distance,
  address,
  rating,
  handleBookNow,
  price,
}) => {
  return (
    <div className="searchItem">
      <img
        className="siImg"
        // src="https://static.wixstatic.com/media/77f58e_3ae21cb6dd5a4896a9a76906f6a6d958~mv2.png"
        src="https://www.watg.com/wp-content/uploads/1978/01/WATG_Shangri-La-Hotel-Garden-Wing-Singapoire-1-1230x640.jpg"
        // src={imageUrl}
        alt=""
      />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <div className="siSubtitle">
          <p>{address}</p>
          {/* <p>{Math.round(distance)}km from the centre</p> */}
        </div>
        <div>
          <Star rating={rating}></Star>
        </div>
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
          <span className="siPrice">SGD {price}</span>
          <span className="siSubDetails">1 room, 3 nights</span>
        </div>
        <button className="siCheckButton" onClick={handleBookNow}>
          Select Room
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
