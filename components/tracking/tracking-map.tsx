"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TrackingPoint {
  lat: number;
  lng: number;
  label: string;
  status: "completed" | "current" | "pending";
}

interface TrackingMapProps {
  points: TrackingPoint[];
}

export default function TrackingMap({ points }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([points[0]?.lat ?? 13.7563, points[0]?.lng ?? 100.5018], 6);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
      }
    ).addTo(map);

    // Add zoom control on the right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Draw route line
    const latlngs: L.LatLngExpression[] = points.map((p) => [p.lat, p.lng]);
    L.polyline(latlngs, {
      color: "#e8590c",
      weight: 3,
      opacity: 0.8,
      dashArray: "8, 12",
    }).addTo(map);

    // Add markers
    points.forEach((point) => {
      const color =
        point.status === "completed"
          ? "#22c55e"
          : point.status === "current"
            ? "#e8590c"
            : "#64748b";

      const size = point.status === "current" ? 14 : 10;

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 ${point.status === "current" ? "12px" : "6px"} ${color};
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      L.marker([point.lat, point.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="
            background: #141822;
            color: #e2e8f0;
            padding: 8px 12px;
            border-radius: 8px;
            font-family: system-ui;
            font-size: 13px;
            border: 1px solid #1e293b;
          ">
            <strong>${point.label}</strong><br/>
            <span style="color: ${color}; text-transform: capitalize;">${point.status}</span>
          </div>`,
          {
            className: "dark-popup",
          }
        );
    });

    // Fit bounds
    if (points.length > 1) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [points]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <div ref={mapRef} className="h-[300px] w-full md:h-[400px]" />
      <style jsx global>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          padding: 0;
        }
        .dark-popup .leaflet-popup-tip {
          background: #141822;
          border: 1px solid #1e293b;
        }
        .dark-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-control-zoom a {
          background: #141822 !important;
          color: #e2e8f0 !important;
          border-color: #1e293b !important;
        }
      `}</style>
    </div>
  );
}
