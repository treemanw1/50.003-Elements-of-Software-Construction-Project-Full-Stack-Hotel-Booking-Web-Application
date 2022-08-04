import "./searchItem.css";
import Star from "../../components/star/Star";
import { useState } from "react";

const SearchItem = ({
  imageUrl,
  name,
  // distance,
  address,
  rating,
  handleBookNow,
  price,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const onError = () => setImgSrc("https://www.caspianpolicy.org/no-image.png");

  return (
    <div className="searchItem">
      <img className="siImg" src={imgSrc} onError={onError} alt="Hotel image" />
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
        {/* <button className="siFeatures">
          <i class="fas fa-location-arrow fa-fw"></i> Show on Map
        </button> */}
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">SGD {price}</span>
          <span className="siSubDetails">per night</span>
        </div>
        <button
          data-testid="selectRoom"
          className="siCheckButton"
          onClick={handleBookNow}
        >
          Select Room
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
