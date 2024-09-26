"use client";

import React from "react";

import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import Link from "next/link";

import { MapMarker } from "@/components/cms/block-stores-map/MapMarker";
import { StoreWorkingDays } from "@/modules/store/StoreWorkingDays";
import { BaseStoreFragment } from "@/types";
import { stringToUrl } from "@/utils/helpers";

import "leaflet/dist/leaflet.css";

interface Props {
  stores?: Array<BaseStoreFragment | null> | null;
  selectedStore?: BaseStoreFragment | null;
}

export const createMapIcon = (): L.DivIcon => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(<MapMarker />),
    iconSize: [30, 30],
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
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
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
                  <Popup className="!m-0">
                    <Link
                      href={`/store/${store.external_id}/${stringToUrl(store.name)}`}
                      className="flex flex-col gap-1 pr-4 !text-black"
                    >
                      <span className="font-semibold">{store?.name}</span>
                      <span className="mb-2">
                        {[store?.street, store?.postcode, store?.city].join(
                          ", ",
                        )}
                      </span>
                      <StoreWorkingDays store={store} />
                    </Link>
                  </Popup>
                </Marker>
              );
            }
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
