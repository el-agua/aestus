import Head from "next/head";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmlyZXRydWNrcyIsImEiOiJja3VhYmJ5OXIwZjBwMnZubmJvdnVraWUyIn0.TBUerfZFVOW-FATfiu6ylg";
// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export default function Home({ data }) {
  const layers = [new LineLayer({ id: "line-layer", data })];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
}
