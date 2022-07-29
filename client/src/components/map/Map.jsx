import { useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "./map.css"

const Map = ({lat, lng, zoom}) => {
    const center = useMemo(() => ({ lat: lat, lng: lng }), []);
  
    return (
      <GoogleMap zoom={zoom} center={{ lat: lat, lng: lng }} mapContainerClassName="map-container">
        <MarkerF position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    );
  }

export default Map;