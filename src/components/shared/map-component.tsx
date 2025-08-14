"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { Location } from "@/app/map/page";

interface MapComponentProps {
  locations: Location[];
}

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const MapEventsHandler = dynamic(
  () =>
    import("react-leaflet").then((mod) => {
      const { useMapEvents } = mod;
      return function MapEventsHandlerComponent({
        locations,
      }: {
        locations: Location[];
      }) {
        const map = useMapEvents({
          locationfound: (e) => {
            map.flyTo(e.latlng, 13);
          },
        });

        useEffect(() => {
          if (locations?.length > 0) {
            const latestLocation = locations[0];
            map.flyTo(
              [
                Number(latestLocation.latitude),
                Number(latestLocation.longitude),
              ],
              13
            );
          }
        }, [locations, map]);

        useEffect(() => {
          const timer = setTimeout(() => {
            if (map && typeof map.locate === "function") {
              map.locate({ setView: true, maxZoom: 13 });
            }
          }, 100);

          return () => clearTimeout(timer);
        }, [map]);

        return null;
      };
    }),
  { ssr: false }
);

export function MapComponent({ locations }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  // const [leafletIcon, setLeafletIcon] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);

    import("leaflet").then((L) => {
      // Remove any default _getIconUrl to prevent errors
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      // Set default icon globally
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });

    // Add Leaflet CSS dynamically
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    return () => {
      const existingLink = document.querySelector('link[href*="leaflet.css"]');
      if (existingLink) document.head.removeChild(existingLink);
    };
  }, []);

  // Default center (New York City)
  const defaultCenter: [number, number] = [40.7128, -74.006];

  // Calculate center from locations or use default
  const center: [number, number] =
    locations?.length > 0
      ? [
          locations.reduce((sum, loc) => sum + Number(loc.latitude), 0) /
            locations.length,
          locations.reduce((sum, loc) => sum + Number(loc.longitude), 0) /
            locations.length,
        ]
      : defaultCenter;

  if (!isClient) {
    return (
      <div className="h-full min-h-[500px] lg:min-h-[600px] relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[500px] lg:min-h-[600px] relative rounded-lg overflow-hidden border">
      <MapContainer
        center={center}
        zoom={locations?.length > 0 ? 10 : 13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        ref={mapRef}
        key={`map-${locations?.length}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEventsHandler locations={locations} />

        {locations?.map((location, index) => (
          <Marker
            key={`${location.id}-${index}`}
            position={[Number(location.latitude), Number(location.longitude)]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {location.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Coordinates:</span>{" "}
                    {Number(location.latitude).toFixed(4)},{" "}
                    {Number(location.longitude).toFixed(4)}
                  </p>
                  <p>
                    <span className="font-medium">Added:</span>{" "}
                    {location?.createdAt
                      ? new Date(location.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Location Counter */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium shadow-lg z-10 border">
        <MapPin className="inline h-4 w-4 mr-1 text-blue-600" />
        {locations?.length} Location{locations?.length !== 1 ? "s" : ""}
      </div>

      {locations?.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg z-10 border">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <p className="text-sm font-medium text-gray-800 mb-1">
            No locations added yet
          </p>
          <p className="text-xs text-gray-600">
            Add a location using the form to see markers on the map
          </p>
        </div>
      )}
    </div>
  );
}
