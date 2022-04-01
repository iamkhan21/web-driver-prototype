import React, { useEffect, useRef, useState } from "react";
import {
  convertCoordinatesObjectToArray,
  getAccuracy,
  getCoordinates,
} from "@utils/geolocation";
import { Map } from "mapbox-gl";
import { drawMarker } from "@utils/map-helpers";
import { useStore } from "effector-react";
import { $userGeolocation } from "@application/geolocation";
import { Coordinates } from "@application/geolocation/types";

const Mapbox = () => {
  const map = useRef<Map | null>(null);
  const isCentered = useRef(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const location = useStore($userGeolocation);

  function drawUserMarker(map: Map, coordinates: Coordinates) {
    drawMarker(map, convertCoordinatesObjectToArray(coordinates), "user", {
      size: 5,
    });
  }

  useEffect(() => {
    (async () => {
      await import("mapbox-gl/dist/mapbox-gl.css");
      const mapboxgl = (await import("mapbox-gl")).default;

      // @ts-ignore
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

      const coordinates = getCoordinates(location);

      // @ts-ignore
      map.current = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates || [-122.667569, 45.523825], // starting position
        zoom: 15,
      });

      // @ts-ignore
      map.current.on("load", () => {
        setIsMapLoaded(true);

        if (coordinates) {
          drawUserMarker(map.current!, coordinates);
          isCentered.current = true;
        }
      });
    })();

    // @ts-ignore
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const coordinates = getCoordinates(location);

    if (coordinates && map.current && isMapLoaded) {
      drawUserMarker(map.current!, coordinates);

      if (isCentered.current) {
        map.current!.flyTo({ center: coordinates });
      } else {
        map.current!.jumpTo({ center: coordinates });
        isCentered.current = true;
      }
    }
  }, [location?.latitude, location?.longitude, isMapLoaded]);

  const accuracy = getAccuracy(location);
  return (
    <section>
      <p>Accuracy: {Math.round(accuracy || 0) / 1_000} km</p>
      <br />
      <section id="mapbox" style={{ height: "70vh" }}>
        <p>Loading your location...</p>
      </section>
    </section>
  );
};

export default Mapbox;
