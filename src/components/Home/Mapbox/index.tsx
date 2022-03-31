import React, { useEffect, useRef } from "react";
import useWatchLocation from "../../../hooks/useWatchLocation";
import {
  convertCoordinatesObjectToArray,
  Coordinates,
  getAccuracy,
  getCoordinates,
} from "../../../utils/geolocation";
import { Map } from "mapbox-gl";
import { drawMarker } from "../../../utils/map-helpers";

const Mapbox = () => {
  const map = useRef<Map | null>(null);
  const { location } = useWatchLocation();

  function drawUserMarker(map: Map, coordinates: Coordinates) {
    drawMarker(map, convertCoordinatesObjectToArray(coordinates), "user");
  }

  useEffect(() => {
    const coordinates = getCoordinates(location);

    if (coordinates && !map.current) {
      (async () => {
        await import("mapbox-gl/dist/mapbox-gl.css");
        const mapboxgl = (await import("mapbox-gl")).default;

        // @ts-ignore
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

        // @ts-ignore
        map.current = new mapboxgl.Map({
          container: "mapbox",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-122.667569, 45.523825], // starting position
          zoom: 15,
        });

        // @ts-ignore
        map.current.on("load", () => {
          map.current!.jumpTo({ center: coordinates });
          drawUserMarker(map.current!, coordinates);
        });
      })();
    }

    // @ts-ignore
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    const coordinates = getCoordinates(location);

    if (coordinates && map.current) {
      drawUserMarker(map.current!, coordinates);
    }
  }, [location?.latitude, location?.longitude]);

  const accuracy = getAccuracy(location);

  return (
    <section>
      <p>Accuracy: {Math.round(accuracy || 0) / 1_000} km</p>
      <section id="mapbox" style={{ height: "80vh" }}>
        <h3>Loading your location</h3>
      </section>
    </section>
  );
};

export default Mapbox;
