<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Charging Stations Map</h2>
    <div id="map" class="h-96 w-full rounded shadow-md"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      centerLocation: [37.7749, -122.4194], // San Francisco coordinates
      zoomLevel: 12, // Adjusted for city-level view
      iconMap: {
        'Type 1': L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', // Blue marker
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        'Type 2': L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Red marker
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        'CCS': L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Green marker
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
        'default': L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        }),
      },
    };
  },
  computed: {
    chargers() {
      return this.$store.state.chargers;
    },
  },
  mounted() {
    this.initMap();
    this.$store.dispatch('fetchChargers');
  },
  watch: {
    chargers(newChargers) {
      this.updateMap(newChargers);
    },
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.centerLocation, this.zoomLevel);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    updateMap(chargers) {
      // Clear existing markers
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });

      // Add new markers
      chargers.forEach((charger) => {
        if (
          charger.location &&
          typeof charger.location.latitude === 'number' &&
          typeof charger.location.longitude === 'number'
        ) {
          const icon = this.iconMap[charger.connectorType] || this.iconMap['default'];
          const marker = L.marker([charger.location.latitude, charger.location.longitude], { icon }).addTo(this.map);
          marker.bindPopup(`
            <b>${charger.name}</b><br>
            Status: ${charger.status}<br>
            Power Output: ${charger.powerOutput} kW<br>
            Connector Type: ${charger.connectorType}
          `);
        } else {
          console.warn('Invalid charger coordinates:', charger);
        }
      });

      // Fit map to bounds if chargers exist
      if (chargers.length > 0) {
        const bounds = chargers
          .filter(
            (c) =>
              c.location &&
              typeof c.location.latitude === 'number' &&
              typeof c.location.longitude === 'number'
          )
          .map((c) => [c.location.latitude, c.location.longitude]);
        if (bounds.length > 0) {
          this.map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    },
  },
};
</script>

<style>
/* Fix Leaflet marker icons */
.leaflet-default-icon-path {
  background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
}
</style>