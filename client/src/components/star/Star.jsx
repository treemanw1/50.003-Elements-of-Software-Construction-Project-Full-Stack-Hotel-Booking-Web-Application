import React from "react";
import ReactStars from "react-rating-stars-component";

const Star = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      size={30}
      value={rating}
      edit={false}
      activeColor="#ffd700"
      disabled={true}
    />
  );
};

export default Star;
