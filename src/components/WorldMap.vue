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
      <p class="country-description">{{ selectedCountry.description }}</p>
      <p class="country-inteligence" v-if="selectedCountry.inteligence">
        Отношение к России: {{ selectedCountry.attToRussia }}
      </p>
      <hr />
      <div class="agreements-list">
        <label
          class="agreement-title"
          v-for="(agreement, index) in filteredAgreements()"
          :key="index"
        >
          <input type="radio" v-model="selectedAgreement" :value="agreement" />
          {{ agreement.title }}
        </label>
      </div>
    </template>
    <template #footer>
      <button
        v-if="!selectedCountry.inteligence && spies > 0"
        class="modal-footer-button"
        @click="sentSpy"
      >
        Внедрить шпиона
      </button>
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
  emits: {
    sentSpy: null,
  },
  data() {
    return {
      svgId: "worldMap",
      svgContainer: null,
      hoverCountryColor: "",

      spies: 10,

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
      let fillColor = "#fff";
      let opacity = 1;
      const country = vm.countries.find((country) => country.id == pathObj.id);
      opacity = country.attToRussia / 10;
      if (country.attToRussia > 0) {
        fillColor = "#2eb62c";
      } else if (country.attToRussia < 0) {
        fillColor = "#dc1c13";
        opacity *= -1;
      }
      const attrs = {
        fill: fillColor,
        stroke: "#7e7e7e",
        opacity: opacity,
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
        vm.hoverCountryColor = this.node.attributes["fill"].value;
        this.node.attributes["fill"].value = "#e2e2e2";
      });
      element.mouseout(function () {
        this.node.attributes["fill"].value = vm.hoverCountryColor;
      });
    },
    openAgreementDialog(countryId) {
      this.selectedCountry = this.countries.find(
        (country) => country.id == countryId
      );
      this.isModalVisible = true;
    },
    initAgreement() {
      console.log(this.selectedAgreement);
      this.selectedAgreement = null;
      this.closeModalWindow();
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
    sentSpy() {
      this.spies--;
      this.$emit("sentSpy", this.selectedCountry.id);
    },
    filteredAgreements() {
      return this.agreements.filter((item) => {
        switch (item.name) {
          case "nuclear":
            return ["CN", "FR", "GB", "RU", "US"].includes(
              this.selectedCountry.id
            );
          case "apposition":
          case "cyber":
            return (
              this.selectedCountry.inteligence &&
              this.selectedCountry.attToRussia < item.score
            );
          default:
            if (item.score >= 0) {
              return this.selectedCountry.attToRussia >= item.score;
            } else {
              return this.selectedCountry.attToRussia <= item.score;
            }
        }
      });
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
.country-inteligence {
  text-align: center;
}
.agreements-list {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
