import { Fragment } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const GoogleMapComp = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.key,
  });

  const center = { lat: 42.4414, lng: 19.2624 };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </Fragment>
  );
};

export default GoogleMapComp;
