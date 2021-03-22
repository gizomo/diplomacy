<template>
  <div class="main-wrapper">
    <div class="map-wrapper">
      <world-map @map-clicked="onMapClick"></world-map>
    </div>
  </div>
  <pop-up
    v-if="isPopUpVisible"
    :popUpTitle="selectedContry.title"
    @closePopUp="closePopUpWindow"
  >
    <h2>{{ selectedContry.title }}</h2>
    <p>{{ selectedContry.mapId }}</p>
  </pop-up>
</template>

<script>
import WorldMap from "./components/WorldMap";
import PopUp from "./components/PopUp";

export default {
  name: "App",
  components: {
    WorldMap,
    PopUp,
  },
  data() {
    return {
      isPopUpVisible: false,
      selectedContry: {},
    };
  },
  methods: {
    onMapClick(attr) {
      this.isPopUpVisible = true;
      this.selectedContry = attr;
      //alert(`You cliked at ${attr.mapId}: ${attr.title}`);
    },
    closePopUpWindow() {
      this.isPopUpVisible = false;
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  padding: 3rem;
}
.map-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
