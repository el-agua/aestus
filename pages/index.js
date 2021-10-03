import Head from "next/head";
import DeckGL from "@deck.gl/react";
import { LineLayer, ScatterplotLayer} from "@deck.gl/layers";
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import { StaticMap } from "react-map-gl";
const MALE_COLOR = [0, 128, 255];
const FEMALE_COLOR = [255, 0, 128];

// Source data CSV
var json = require("../Proc-data.json");

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



export default function Home() {
  return (
    <div>
      <div>Hello</div>
      <Map />
    </div>
  );
}
function Map({
  data = json,
  radius = 30,
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
}) {
  
  const layers = [new HexagonLayer({
    id: 'heatmap',
    colorRange: [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ],
    coverage: 1,
    data,
    elevationRange: [0, 10000],
    elevationDomain: [280, 300],
    getElevationWeight: d => d.TEMPERATURE,
    extruded: true,
    getPosition: d => [d.LATLON[1],d.LATLON[0]],
    pickable: true,
    radius: 10000,
    upperPercentile: 100,
  })];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
}
