import Head from "next/head";
import DeckGL from "@deck.gl/react";
import Card from "../components/Box"
import Select from "../components/Select"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import { LineLayer, ScatterplotLayer} from "@deck.gl/layers";
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import { StaticMap } from "react-map-gl";
const MALE_COLOR = [0, 128, 255];
const FEMALE_COLOR = [255, 0, 128];

// Source data CSV
var json = require("../Proc-data.json");

const INITIAL_VIEW_STATE = {
  longitude: 10,
  latitude: 24,
  zoom: 1.75,
  pitch: 30,
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



export default function Pressure() {
  return (
    <div>
      <NavBar/>
    <div style={{position: "relative", height: "91vh"}}>
      <Map />
    </div>
    </div>
  );
}
function Map({
  data = json,
  radius = 30,
  mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
}) {
  const [property, setProperty] = useState("Humidity")
  const colors = [
    [1, 152, 189, "Low Precipitation"],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78, "High Precipitation"]
  ]
  var layers = [new HeatmapLayer({
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
    getWeight: d => d.PRECIPITATION,
    threshold:.1,
    aggregation: 'SUM'
  })]
  return (
    <div>
      <div
        style={{
          zIndex: "1000",
          position: "absolute",
          bottom: "1.0%",
          left: "1.5%",
          display: "flex",
          flexDirection: "column",
          width: "360px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <Card>
          {colors.map((color) => (
                <div
                  style={{
                    width: "100%",
                    position: "inline-block",
                    verticalAlign: "middle",
                    height: "30px",
                    backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  }}
                  ><div className="text-black text-lg text-center w-full h-full">{color[3]}</div></div>
             
             
          ))}
          <div className="text-black mt-5">
          </div>
        </Card>
        </div>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      </DeckGL>
    </div>
  );
}
