import "./roomItem.css";

const RoomItem = ({
  imageUrl,
  name,
  handleBookNow,
  price,
}) => {
  return (
    <div className="roomItem">
      <img className="roomImg" src={imageUrl} alt="" />
      <div className="roomDesc">
        <h1 className="roomTitle">{name}</h1>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossOrigin="anonymous"
        ></link>
      </div>
      <div className="roomDetails">
        <div className="roomDetailTexts">
          <span className="roomPrice">SGD {price}</span>
          <span className="roomSubDetails">per night</span>
        </div>
        <button data-testid = "BookNow" className="roomCheckButton" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomItem;
