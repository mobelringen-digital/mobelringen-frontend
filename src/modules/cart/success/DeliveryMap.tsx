"use client";

import React from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { MaskedOrderFragment } from "@/types";

interface Props {
  order?: MaskedOrderFragment | null;
}

const DeliveryMap: React.FC<Props> = ({ order }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const cords = [
    Number(order?.coordinates?.lat),
    Number(order?.coordinates?.lng),
  ] as [number, number];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <MapContainer
      className="rounded-3xl z-20 mt-8"
      center={cords}
      style={{ height: 400 }}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      />
      <Marker position={cords} />
    </MapContainer>
  );
};

export default DeliveryMap;
