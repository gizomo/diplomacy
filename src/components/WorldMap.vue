<template>
  <div class="map">
    <panZoom selector="#worldMap" :options="{ minZoom: 1, maxZoom: 2 }">
      <div :id="svgId" class="svg-container"></div>
    </panZoom>
  </div>
  <modal v-if="isModalVisible" @closeModal="closeModalWindow">
    <template #header>
      <img
        class="flag"
        :src="require('../assets/flags/' + countryId + '.svg')"
        :alt="selectedCountry.title"
      />
      <h2 class="country-name">{{ selectedCountry.title }}</h2>
    </template>
    <template #content>
      <p>{{ selectedCountry.description }}</p>
      <hr />
      <div class="agreements-list">
        <label
          class="agreement-title"
          v-for="(agreement, index) in agreements"
          :key="index"
        >
          <input type="radio" v-model="selectedAgreement" :value="agreement" />
          {{ agreement.title }}
        </label>
      </div>
    </template>
    <template #footer>
      <button
        v-if="selectedAgreement"
        class="modal-footer-button"
        @click="initAgreement"
      >
        Внести
      </button>
    </template>
  </modal>
</template>

<script>
import WorldMapData from "../assets/worldRussiaCrimeaLow";
import GameData from "../assets/gameData";
import Modal from "./Modal";

export default {
  name: "WorldMap",
  components: {
    Modal,
  },
  props: {
    countries: Array,
  },
  data() {
    return {
      svgId: "worldMap",
      svgContainer: null,

      agreements: GameData.agreements,
      selectedAgreement: null,

      countryId: "",
      selectedCountry: null,

      isModalVisible: false,
    };
  },
  mounted() {
    this.generateMap();
  },
  methods: {
    generateMap() {
      const mapData = WorldMapData.countries;
      const svgContainer = this.$svg("worldMap")
        .size("100%", "100%")
        .viewbox(0, 0, 1028, 680);
      this.svgContainer = svgContainer;
      svgContainer.id("countries");
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
        vm.countryId = attrs.mapId;
        vm.openAgreementDialog(vm.countryId);
      });
      element.mouseover(function () {
        this.node.attributes["fill"].value = "#e2e2e2";
      });
      element.mouseout(function () {
        this.node.attributes["fill"].value = "#fff";
      });
    },
    openAgreementDialog(countryId) {
      this.selectedCountry = this.countries.find(
        (country) => country.id == countryId
      );
      console.log(countryId);
      this.isModalVisible = true;
    },
    initAgreement() {
      console.log(this.selectedAgreement);
      this.closeModalWindow();
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.map {
  overflow: hidden;
  background-color: #abcdef;
  border: 1px solid #fff;
}
.svg-container {
  height: 70vh;
  padding: 2rem;
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
