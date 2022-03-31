import React, { useEffect, useRef } from "react";

const Map = () => {
  const map = useRef();

  useEffect(() => {
    (async () => {
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
      map.current?.on("load", () => {
        // @ts-ignore
        // map.current?.setMaxBounds(bounds);
      });
    })();

    // @ts-ignore
    return () => map.current?.remove();
  }, []);

  return (
    <article>
      <div id="mapbox" style={{ height: "80vh" }} />
    </article>
  );
};

export default Map;
