import React, { useEffect, useRef, useState } from "react";
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
  const isCentred = useRef<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { location } = useWatchLocation();

  function drawUserMarker(map: Map, coordinates: Coordinates) {
    drawMarker(map, convertCoordinatesObjectToArray(coordinates), "user", {
      size: 10,
    });
  }

  useEffect(() => {
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
        setMapLoaded(true);
      });
    })();

    // @ts-ignore
    return () => {
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, []);

  useEffect(() => {
    const coordinates = getCoordinates(location);

    if (coordinates && map.current) {
      drawUserMarker(map.current!, coordinates);

      if (!isCentred.current) {
        map.current!.jumpTo({ center: coordinates });
        isCentred.current = true;
      }
    }
  }, [location?.latitude, location?.longitude, mapLoaded]);

  const accuracy = getAccuracy(location);

  return (
    <section>
      <p>Accuracy: {Math.round(accuracy || 0) / 1_000} km</p>
      <section id="mapbox" style={{ height: "75vh" }}>
        <h3>Loading your location</h3>
      </section>
    </section>
  );
};

export default Mapbox;
