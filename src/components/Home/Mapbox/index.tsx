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
import { formatNumberToHR } from "@utils/formatters";

const Mapbox = () => {
  const alive = useRef(true);
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
    alive.current = true;

    (async () => {
      await import("mapbox-gl/dist/mapbox-gl.css");
      const mapboxgl = (await import("mapbox-gl")).default;

      if (!alive.current) return;

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
      alive.current = false;
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
      <p className="py-2">
        Accuracy: {formatNumberToHR(Math.round(accuracy || 0))} meters
      </p>
      <section
        id="mapbox"
        style={{ height: "75vh", backgroundColor: "#f2f2f2" }}
      >
        <p className="p-2">Loading map...</p>
      </section>
    </section>
  );
};

export default Mapbox;
