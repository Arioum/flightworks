// Browser-only: Leaflet touches `window` when imported, so this file uses the
// Remix `.client` suffix, which swaps it for an empty module in the server
// build. Render it only after the component has mounted on the client.
import { MapContainer, TileLayer } from 'react-leaflet';

// Esri World Imagery: free satellite tiles, no API key needed. Esri requires
// this attribution to stay visible on the map.
const ESRI_IMAGERY_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ESRI_ATTRIBUTION =
  'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

const SatelliteMap = ({ center, zoom = 14 }) => (
  <MapContainer
    // MapContainer ignores center changes after mount; remount per location.
    key={center.join(',')}
    center={center}
    zoom={zoom}
    scrollWheelZoom={false}
    className='h-[285px] w-[100%] rounded-[14px]'
  >
    <TileLayer url={ESRI_IMAGERY_URL} attribution={ESRI_ATTRIBUTION} maxZoom={18} />
  </MapContainer>
);

export default SatelliteMap;
