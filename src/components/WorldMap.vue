<template>
  <div :id="svgId" class="svg-container"></div>
</template>

<script>
import WorldMapData from "../assets/worldRussiaCrimeaLow";

export default {
  name: "WorldMap",
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
    };
  },
  mounted() {
    this.generateMap();
  },
  methods: {
    generateMap: function () {
      const mapData = WorldMapData.g.path;
      const svgContainer = this.$svg("worldMap")
        .size(this.mapAttr.svgWitdh, this.mapAttr.svgHeight)
        .viewbox(0, 0, this.mapAttr.viewBoxWidth, this.mapAttr.viewBoxHeight);
      this.svgContainer = svgContainer;
      mapData.forEach((pathObj) => {
        this.generatePath(svgContainer, pathObj);
      });
    },
    generatePath: function (svgCont, pathObj) {
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
        const mapId = this.node.attributes["mapId"].value;
        const title = this.node.attributes["title"].value;
        vm.$emit("mapClicked", { mapId, title });
      });
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
</style>
