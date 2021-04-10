<template>
  <div :id="svgId" class="svg-container"></div>
  <modal v-if="isModalVisible" @closeModal="closeModalWindow">
    <template #header>
      <img
        class="flag"
        v-if="modalObject.mapId"
        :src="require('../assets/flags/' + modalObject.mapId + '.svg')"
        :alt="modalObject.title"
      />
      <h2 class="country-name">{{ modalObject.title }}</h2>
    </template>
    <template #content>
      <h1>{{ modalObject.title }}</h1>
    </template>
    <template #footer></template>
  </modal>
</template>

<script>
import WorldMapData from "../assets/worldRussiaCrimeaLow";
import Modal from "./Modal";

export default {
  name: "WorldMap",
  components: {
    Modal,
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

      isModalVisible: false,
      modalObject: {
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
      const mapData = WorldMapData.countries;
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
        vm.modalObject.title = this.node.attributes["title"].value;
        vm.modalObject.mapId = this.node.attributes["mapId"].value;
        vm.isModalVisible = true;
      });
      element.mouseover(function () {
        this.node.attributes["fill"].value = "#e2e2e2";
      });
      element.mouseout(function () {
        this.node.attributes["fill"].value = "#fff";
      });
    },
    closeModalWindow() {
      this.isModalVisible = false;
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
  border: 1px solid #fff;
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(128, 128, 128, 0.5);
}
.flag {
  display: block;
  width: 6rem;
  margin: 0 auto;
}
.country-name {
  margin: 0;
  text-align: center;
  color: #2e2e2e;
}
</style>
