"use client";

import React from "react";

import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { MapMarker } from "@/components/cms/block-stores-map/MapMarker";
import { BaseStoreFragment } from "@/types";

import "leaflet/dist/leaflet.css";

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
  selectedStore?: BaseStoreFragment | null;
}

export const createMapIcon = (): L.DivIcon => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(<MapMarker />),
    iconSize: [40, 40],
    className: "bg-transparent",
  });
};

const Map: React.FC<Props> = ({ stores, selectedStore }) => {
  return (
    <MapContainer
      className="rounded-3xl z-20"
      key={JSON.stringify(selectedStore)}
      center={
        selectedStore
          ? [
              selectedStore.latitude as number,
              selectedStore.longitude as number,
            ]
          : [61.778402, 6.21372]
      }
      style={{ height: 600 }}
      zoom={selectedStore ? 15 : 6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading={true}>
        {stores
          ?.filter((s) => s?.latitude && s?.longitude && s.is_visible_on_map)
          .map((store, idx) => {
            if (store?.latitude && store?.longitude) {
              return (
                <Marker
                  icon={createMapIcon()}
                  key={store?.id ?? idx}
                  position={[store?.latitude, store?.longitude]}
                >
                  <Popup>{store?.name}</Popup>
                </Marker>
              );
            }
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
