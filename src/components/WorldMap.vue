<template>
  <div class="map">
    <panZoom selector="#worldMap" :options="{ minZoom: 1, maxZoom: 3 }">
      <div id="worldMap" class="svg-container"></div>
    </panZoom>
  </div>
  <modal v-if="isModalVisible" @closeModal="closeModalWindow">
    <template #header>
      <button
        class="spy"
        v-if="!selectedCountry.inteligence && spies > 0"
        v-tooltip="'Внедрить шпиона (осталось: ' + spies + ')'"
        @click="sentSpy"
      >
        <img :src="require('../assets/spy.svg')" />
      </button>
      <button
        class="hacker"
        v-if="
          selectedCountry.inteligence &&
          selectedCountry.attToRussia <= -5 &&
          hackers > 0 &&
          !cyberAtacks.includes(selectedCountry.id)
        "
        v-tooltip="'Совершить кибер-атаку (осталось: ' + hackers + ')'"
        @click="cyberAtack"
      >
        <img :src="require('../assets/hacker.svg')" />
      </button>
      <img
        class="flag"
        :src="require('../assets/flags/' + selectedCountry.id + '.svg')"
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
          <input
            type="radio"
            v-model="selectedAgreement"
            :value="agreement"
            :disabled="agreementsStatus()"
          />
          {{ agreement.title }}
        </label>
      </div>
      <p class="agreement-deny" v-if="agreementsStatus(selectedCountry.id)">
        Нельзя выполнить более одного действия за ход с одной и той же страной.
      </p>
    </template>
    <template #footer>
      <button
        v-if="selectedAgreement && !agreementsStatus(selectedCountry.id)"
        class="modal-footer-button"
        @click="initAgreement"
      >
        Продолжить
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
      svgContainer: null,
      hoverCountryColor: "",

      spies: 10,
      hackers: 10,
      cyberAtacks: [],

      agreements: GameData.agreements,
      selectedAgreement: null,
      concludedAgreements: [],

      selectedCountry: null,

      isModalVisible: false,
    };
  },
  mounted() {
    this.generateMap();
  },
  methods: {
    generateMap() {
      this.svgContainer = this.$svg("worldMap")
        .size("100%", "100%")
        .viewbox(0, 0, 1028, 680);
      WorldMapData.countries.forEach((mapItem) => {
        this.generatePath(this.svgContainer, mapItem);
      });
    },
    generatePath(svgCont, pathObj) {
      const vm = this;
      let fillColor = "#fff";
      let opacity = 1;
      // Colorise Map
      // const country = vm.countries.find((country) => country.id == pathObj.id);
      // if (country.attToRussia > 0) {
      //   fillColor = "#2eb62c";
      //   opacity = 0.5 + country.attToRussia * 0.05;
      // } else if (country.attToRussia < 0) {
      //   fillColor = "#dc1c13";
      //   opacity = 0.5 + country.attToRussia * 0.05 * -1;
      // }
      const attrs = {
        fill: fillColor,
        stroke: "#7e7e7e",
        "fill-opacity": opacity,
        "stroke-width": 1,
        mapId: pathObj["id"],
      };
      const element = svgCont.path(pathObj["d"]).attr(attrs);
      element.click(function () {
        if (attrs.mapId === "RU") {
          vm.$emit("openStat", { spies: vm.spies, hackers: vm.hackers });
        } else {
          vm.openAgreementDialog(attrs.mapId);
        }
      });
      element.mouseover(function () {
        vm.hoverCountryColor = this.node.attributes["fill"].value;
        this.node.attributes["fill"].value = "#00efd1";
        if (!this.node.hasChildNodes()) {
          let title = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          title.textContent = pathObj["title"];
          this.node.appendChild(title);
        }
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
    agreementsStatus() {
      return this.concludedAgreements.includes(this.selectedCountry.id);
    },
    filteredAgreements() {
      return this.agreements.filter((item) => {
        if (this.selectedCountry.hasAgreement(item.name)) {
          return false;
        }
        switch (item.name) {
          case "nuclear":
            return ["CN", "FR", "GB", "RU", "US"].includes(
              this.selectedCountry.id
            );
          case "apposition":
            return (
              this.selectedCountry.inteligence &&
              this.selectedCountry.attToRussia <= item.score
            );
          default:
            if (item.score >= 1) {
              return this.selectedCountry.attToRussia >= item.score;
            } else if (item.score <= -1) {
              return this.selectedCountry.attToRussia <= item.score;
            } else {
              return true;
            }
        }
      });
    },
    initAgreement() {
      if (!this.selectedCountry.hasAgreement(this.selectedAgreement.name)) {
        this.selectedCountry.addAgreement(this.selectedAgreement);
        this.concludedAgreements.push(this.selectedCountry.id);
      }
      this.closeModalWindow();
    },
    clearActions() {
      this.concludedAgreements = [];
      this.cyberAtacks = [];
    },
    closeModalWindow() {
      this.selectedAgreement = null;
      this.selectedCountry = null;
      this.isModalVisible = false;
    },
    sentSpy() {
      this.spies--;
      this.selectedCountry.plantSpy();
    },
    cyberAtack() {
      this.hackers--;
      this.cyberAtacks.push(this.selectedCountry.id);
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
.spy,
.hacker {
  all: unset;
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  width: 3rem;
  border: none;
  background-color: none;
  cursor: pointer;
}
.hacker:hover,
.spy:hover {
  transform: scale(1.1);
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
.agreement-deny {
  color: firebrick;
  text-align: center;
}
</style>
