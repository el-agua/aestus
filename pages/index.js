import Head from "next/head";
import DeckGL from "@deck.gl/react";
import { LineLayer, ScatterplotLayer} from "@deck.gl/layers";
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
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
  
  const layers = [new HeatmapLayer({
    id: 'heatmapLayer',
    colorRange: [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ],
    
    data,
    radiusPixels:8,
    getPosition: d => [d.LATLON[1],d.LATLON[0]],
    getWeight: d => d.PRESSURE,
    threshold:.1,
    aggregation: 'SUM'
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
