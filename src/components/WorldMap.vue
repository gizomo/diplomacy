<template>
  <div :id="svgId" class="svg-container"></div>
  <pop-up v-if="isPopUpVisible" @closePopUp="closePopUpWindow">
    <template #header>
      <img
        class="flag"
        v-if="popUpObject.mapId"
        :src="require('../assets/flags/' + popUpObject.mapId + '.svg')"
        :alt="popUpObject.title"
      />
    </template>
    <template #content>
      <h1>{{ popUpObject.title }}</h1>
    </template>
    <template #footer></template>
  </pop-up>
</template>

<script>
import WorldMapData from "../assets/worldRussiaCrimeaLow";
import PopUp from "./PopUp";

export default {
  name: "WorldMap",
  components: {
    PopUp,
  },
  data() {
    return {
      svgId: "worldMap",
      mapAttr: {
        svgWitdh: "100%",
        svgHeight: "100%",
        viewBoxWidth: 1028,
        viewBoxHeight: 680,
      },
      svgContainer: null,

      isPopUpVisible: false,
      popUpObject: {
        title: String,
        mapId: String,
      },
    };
  },
  mounted() {
    this.generateMap();
  },
  methods: {
    generateMap() {
      const mapData = WorldMapData.g.path;
      const svgContainer = this.$svg("worldMap")
        .size(this.mapAttr.svgWitdh, this.mapAttr.svgHeight)
        .viewbox(0, 0, this.mapAttr.viewBoxWidth, this.mapAttr.viewBoxHeight);
      this.svgContainer = svgContainer;
      mapData.forEach((pathObj) => {
        this.generatePath(svgContainer, pathObj);
      });
    },
    generatePath(svgCont, pathObj) {
      const vm = this;
      const attrs = {
        fill: "#fff",
        stroke: "#7e7e7e",
        "stroke-width": 1,
        title: pathObj["title"],
        mapId: pathObj["id"],
      };
      const element = svgCont.path(pathObj["d"]).attr(attrs);
      element.click(function () {
        vm.popUpObject.title = this.node.attributes["title"].value;
        vm.popUpObject.mapId = this.node.attributes["mapId"].value;
        vm.isPopUpVisible = true;
      });
    },
    closePopUpWindow() {
      this.isPopUpVisible = false;
    },
  },
};
</script>

<style scoped>
.svg-container {
  height: 70vh;
  padding: 2rem;
  overflow: hidden;
  background-color: #abcdef;
  border: 1px solid #2e2e2e;
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(128, 128, 128, 0.5);
}
.flag {
  width: 6rem;
}
</style>
