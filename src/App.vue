<template>
  <div class="main-wrapper">
    <div class="map-wrapper">
      <world-map @map-clicked="onMapClick"></world-map>
    </div>
  </div>
  <pop-up
    v-if="isPopUpVisible"
    :popUpContent="popUpObject"
    @closePopUp="closePopUpWindow"
  />
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
      popUpObject: {
        title: "",
        button: "Ok",
        content: {},
      },
    };
  },
  methods: {
    onMapClick(attr) {
      this.isPopUpVisible = true;
      this.popUpObject.title = attr.title;
      this.popUpObject.content = attr;
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
