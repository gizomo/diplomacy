<template>
  <h1>World Map</h1>
  <div>
    <world-map @map-clicked="onMapClick"></world-map>
  </div>
</template>

<script>
import WorldMap from "./components/WorldMap";

export default {
  name: "App",
  components: {
    WorldMap,
  },
  methods: {
    onMapClick: function (attr) {
      alert(`You cliked at ${attr.mapId}: ${attr.title}`);
    }
  }
};
</script>
