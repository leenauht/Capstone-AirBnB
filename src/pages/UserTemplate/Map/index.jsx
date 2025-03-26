import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function SimpleMap() {
  const center = {
    lat: 40.74,
    lng: -74.18,
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDr2_tM5qoccU2euDDaAHKDEl2AyQzsAw0",
  });

  return (
    <div className="map">
      <div className="map-container">
        <GoogleMap
          id="ground-example"
          zoom={13}
          center={center}
          mapContainerStyle={{ width: "400px", height: "400px" }}
        >
          hellô
        </GoogleMap>
      </div>
    </div>
  );
}
