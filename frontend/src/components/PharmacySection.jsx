import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// ✅ Fix Leaflet default marker icon (broken in React/Vite builds)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const pharmacyIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const nearestIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49], iconAnchor: [15, 49], popupAnchor: [1, -34], shadowSize: [41, 41],
});

// ⚠️ This is your real TomTom API key (free tier, no card needed).
// If you ever suspect it's been exposed, rotate it from your TomTom dashboard.


function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

async function fetchOverpassResults(lat, lon) {
  try {
    const radiusMeters = 15000;
    const query = `
      [out:json][timeout:30];
      area["name"="Patiala"]["admin_level"="5"]->.district;
      (
        node["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
        way["amenity"="pharmacy"](around:${radiusMeters},${lat},${lon});
      );
      out center tags;
    `;
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const data = await response.json();

    return (data.elements || [])
      .map((el) => ({
        id: `osm-${el.id}`,
        source: "live_osm",
        lat: el.lat ?? el.center?.lat,
        lon: el.lon ?? el.center?.lon,
        name: el.tags?.name || "Unnamed Pharmacy",
        phone: el.tags?.phone || el.tags?.["contact:phone"] || null,
        hours: el.tags?.opening_hours || null,
        address:
          [
            el.tags?.["addr:housenumber"],
            el.tags?.["addr:street"],
            el.tags?.["addr:suburb"],
            el.tags?.["addr:city"],
          ]
            .filter(Boolean)
            .join(", ") || null,
      }))
      .filter((p) => p.lat && p.lon);
  } catch (err) {
    console.log("Overpass fetch failed:", err);
    return [];
  }
}

async function fetchTomTomResults(lat, lon) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/pharmacies/nearby?lat=${lat}&lon=${lon}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results || [];

    // 🔥 STRICT PHARMACY FILTER
    const filtered = results.filter((r) => {
      const name = (r.poi?.name || "").toLowerCase();
      const categories = (r.poi?.categories || []).join(" ").toLowerCase();

      const text = name + " " + categories;

      return (
        text.includes("pharm") ||
        text.includes("chemist") ||
        text.includes("medical pharmacy")
      );
    });

return filtered
  .filter((r) => r.position?.lat && r.position?.lon)
  .map((r) => ({
    id: `tomtom-${r.id}`,
    source: "tomtom",
    lat: Number(r.position?.lat),
    lon: Number(r.position?.lon),
    name: r.poi?.name || "Pharmacy",
    phone: r.poi?.phone || null,
    hours: r.poi?.openingHours?.text || null,
    address: r.address?.freeformAddress || null,
  }));
  } catch (err) {
    console.log("TomTom fetch failed:", err);
    return [];
  }
}

function PharmacySection() {
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sourceStats, setSourceStats] = useState({ osm: 0, tomtom: 0 });
  const [locationError, setLocationError] = useState(null); // 'denied' | 'unavailable' | 'timeout' | 'unsupported'

useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("unsupported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setUserLocation([lat, lon]);

        const [osmResults, tomtomResults] = await Promise.all([
          fetchOverpassResults(lat, lon),
          fetchTomTomResults(lat, lon),
        ]);

        setSourceStats({ osm: osmResults.length, tomtom: tomtomResults.length });

        const allResults = [...osmResults, ...tomtomResults];

        const seen = new Set();
        const deduped = [];

        for (const p of allResults) {
          const key = `${p.name}-${p.lat}-${p.lon}`;
          if (!seen.has(key)) {
            seen.add(key);
            deduped.push(p);
          }
        }

        deduped.sort(
          (a, b) =>
            parseFloat(getDistance(lat, lon, a.lat, a.lon)) -
            parseFloat(getDistance(lat, lon, b.lat, b.lon))
        );

        setPharmacies(deduped);
        setLoading(false);
      },
      (error) => {
        if (error.code === 1) setLocationError("denied");
        else if (error.code === 2) setLocationError("unavailable");
        else if (error.code === 3) setLocationError("timeout");
        else setLocationError("unavailable");
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const visiblePharmacies = pharmacies.slice(0, visibleCount);
  const nearest = pharmacies.length > 0 ? pharmacies[0] : null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">Nearby Pharmacies</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Finding pharmacies near you...</p>
        </div>
      ) : locationError ? (
        <p className="text-amber-600 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
          ⚠️{" "}
          {locationError === "denied" &&
            "Location access denied. Please enable location permissions and refresh to find nearby pharmacies."}
          {locationError === "unavailable" &&
            "We couldn't determine your location right now. Try refreshing in a moment."}
          {locationError === "timeout" &&
            "Location is taking too long to respond. Check your GPS/network and try again."}
          {locationError === "unsupported" &&
            "Your browser doesn't support location services."}
        </p>
      ) : (
        <>
          {/* ✅ Quick "nearest pharmacy" shortcut banner */}
          {nearest && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide">Nearest Pharmacy</p>
                <p className="font-bold text-base">{nearest.name}</p>
                <p className="text-sm text-gray-500">
                  {getDistance(userLocation[0], userLocation[1], nearest.lat, nearest.lon)} km away
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lon}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium inline-flex items-center gap-1"
              >
                🧭 Directions to Nearest
              </a>
            </div>
          )}

          {userLocation && (
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: "300px", width: "100%", borderRadius: "16px", marginBottom: "20px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={userLocation} icon={userIcon}>
                <Popup>📍 Your Location</Popup>
              </Marker>

              {pharmacies.map((p, idx) => (
                <Marker
                  key={p.id}
                  position={[p.lat, p.lon]}
                  icon={idx === 0 ? nearestIcon : pharmacyIcon}
                >
                  <Popup>
                    <strong>{p.name}</strong>
                    {idx === 0 && <><br />⭐ Nearest to you</>}
                    <br />
                    {p.address}
                    {p.phone && <><br />📞 {p.phone}</>}
                    {p.hours && <><br />🕐 {p.hours}</>}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <div className="relative">

{/* Top Fade */}

  <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />

{/* Scrollable Content */}

<div className="relative">

  {/* Top Fade */}
  <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />

  {/* Scroll Area */}
  <div
    className="
      space-y-4
      max-h-[500px]
      overflow-y-auto
      pr-2
      scroll-smooth
      scrollbar-thin
      scrollbar-thumb-blue-300
      scrollbar-track-transparent
    "
  >

    {pharmacies.length === 0 ? (
      <p className="text-gray-500">
        No pharmacies found nearby.
      </p>
    ) : (
      visiblePharmacies.map((p, idx) => {
        const distance = getDistance(
          userLocation[0],
          userLocation[1],
          p.lat,
          p.lon
        );

        return (
          <div
            key={p.id}
            className={`
              border
              rounded-2xl
              p-4
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
              ${
                idx === 0
                  ? "border-green-400 bg-green-50/30"
                  : ""
              }
            `}
          >
            <div className="flex justify-between items-start">

              <h3 className="font-bold text-base">
                {p.name}

                {idx === 0 && (
                  <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    ⭐ Nearest
                  </span>
                )}
              </h3>

              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                {distance} km
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-1">
              📍 {p.address || "Address not listed"}
            </p>

            {p.phone ? (
              <a
                href={`tel:${p.phone}`}
                className="text-sm text-blue-600 mt-1 flex items-center gap-1 hover:underline"
              >
                📞 {p.phone}
              </a>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                📞 No contact listed
              </p>
            )}

            {p.hours ? (
              <p className="text-sm text-green-600 font-medium mt-1">
                🕐 {p.hours}
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                🕐 Hours not listed — call ahead
              </p>
            )}

            <div className="flex gap-3 mt-3 flex-wrap">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  p.name + ", " + (p.address || "")
)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
              >
                🗺️ Directions
              </a>
            </div>

          </div>
        );
      })
    )}

    {visibleCount < pharmacies.length && (
      <button
        onClick={() =>
          setVisibleCount((c) => c + 10)
        }
        className="w-full text-sm text-blue-600 font-medium py-2 hover:bg-blue-50 rounded-lg"
      >
        Show more pharmacies ({pharmacies.length - visibleCount} remaining)
      </button>
    )}

  </div>

  {/* Bottom Fade */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />
</div>
</div>
</> 
)}
    </div>
  );
      }

export default PharmacySection;
