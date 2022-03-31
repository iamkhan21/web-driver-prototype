import { Map } from "mapbox-gl";

export type PointOptions = {
  color?: string;
  size?: number;
};

export function drawMarker(
  map: Map,
  coordinates: number[],
  name: string,
  { color = "#f30", size = 5 }: PointOptions
) {
  const collection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates,
        },
      },
    ],
  };

  if (map.getLayer(name)) {
    // @ts-ignore
    map.getSource(name).setData(collection);
  } else {
    map.addLayer({
      id: name,
      type: "circle",
      source: {
        type: "geojson",
        // @ts-ignore
        data: collection,
      },
      paint: {
        "circle-radius": size,
        "circle-color": color,
      },
    });
  }
}
