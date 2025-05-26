
import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { MapPin, TruckIcon } from "lucide-react";

interface OrderTrackingMapProps {
  trackingInfo: {
    currentLocation: {
      lat: number;
      lng: number;
    };
    destination: {
      lat: number;
      lng: number;
    };
  };
}

const containerStyle = {
  width: '100%',
  height: '300px'
};

const OrderTrackingMap = ({ trackingInfo }: OrderTrackingMapProps) => {
  const [showInfoWindow, setShowInfoWindow] = React.useState(false);
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  // For demo purposes, if no tracking info is provided, use default coordinates
  const defaultCenter = {
    lat: 9.0820, // Nigeria coordinates as default
    lng: 8.6753
  };
  
  const currentLocation = trackingInfo?.currentLocation || defaultCenter;
  const destination = trackingInfo?.destination || { lat: currentLocation.lat + 0.5, lng: currentLocation.lng + 0.5 };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg" // Using a default public dev key from Google docs
  });

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng));
    bounds.extend(new window.google.maps.LatLng(destination.lat, destination.lng));
    map.fitBounds(bounds);
    mapRef.current = map;
    setMapLoaded(true);
  }, [currentLocation, destination]);

  const onUnmount = React.useCallback(() => {
    mapRef.current = null;
  }, []);

  if (!isLoaded) {
    return <div className="h-[300px] w-full bg-gray-100 animate-pulse flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="relative rounded-md overflow-hidden border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {/* Current location marker - truck icon */}
        <Marker
          position={currentLocation}
          icon={{
            path: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
            fillColor: "#4C51BF",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#4C51BF",
            scale: 1.5,
            anchor: new google.maps.Point(15, 15),
          }}
          onClick={() => setShowInfoWindow(true)}
        >
          {showInfoWindow && (
            <InfoWindow
              position={currentLocation}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className="p-1">
                <p className="text-sm font-medium">Your package is here</p>
                <p className="text-xs text-gray-500">Estimated delivery: 2 days</p>
              </div>
            </InfoWindow>
          )}
        </Marker>

        {/* Destination marker - location pin */}
        <Marker
          position={destination}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#E53E3E",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#E53E3E",
            scale: 1.5,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      </GoogleMap>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-md">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full bg-indigo-600"></div>
          <span className="text-xs">Current Location</span>
        </div>
        <div className="flex items-center mt-1">
          <div className="w-4 h-4 mr-2 rounded-full bg-red-600"></div>
          <span className="text-xs">Destination</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingMap;
