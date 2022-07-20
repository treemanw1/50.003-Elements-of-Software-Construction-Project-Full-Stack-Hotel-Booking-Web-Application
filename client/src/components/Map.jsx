import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./map.css"

const Map = ({lat, lng}) => {
    const center = useMemo(() => ({ lat: lat, lng: lng }), []);
  
    return (
      <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
      </GoogleMap>
    );
  }

export default Map;