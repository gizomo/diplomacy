<template>
  <div :id="svgId" class="svg-container"></div>
</template>

<script>
import WorldMapData from "../assets/worldRussiaCrimeaLow";

export default {
  name: "WorldMap",
  data: function () {
    return {
      svgId: "worldMap",
      mapAttr: {
        viewBoxWidth: 1600,
        viewBoxHeight: 800,
      },
      svgContainer: null,
    };
  },
  mounted: function () {
    this.generateMap();
  },
  methods: {
    generateMap: function () {
      const mapData = WorldMapData.g.path;
      const svgContainer = this.$svg("worldMap")
        .size("100%", "100%")
        .viewbox(0, 0, this.mapAttr.viewBoxWidth, this.mapAttr.viewBoxHeight);
      this.svgContainer = svgContainer;
      mapData.forEach((pathObj) => {
        this.generatePath(svgContainer, pathObj);
      });
    },
    generatePath: function (svgCont, pathObj) {
      const vm = this;
      const attrs = {
        fill: "#e2e2e2",
        stroke: "white",
        "stroke-width": 1,
        title: pathObj["title"],
        "map-id": pathObj["id"],
      };
      const element = svgCont.path(pathObj["d"]).attr(attrs);
      element.click(function () {
        const mapId = this.node.attributes["map-id"].value;
        const title = this.node.attributes["title"].value;
        vm.$emit("mapClicked", { mapId, title });
      });
    }
  }
};
</script>