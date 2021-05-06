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
        <img :src="require('../../public/images/spy.svg')" />
      </button>
      <button
        class="hacker"
        v-if="
          selectedCountry.inteligence &&
          selectedCountry.attToRussia <= -5 &&
          hackers > 0 &&
          !countryHacked
        "
        v-tooltip="'Совершить кибер-атаку (осталось: ' + hackers + ')'"
        @click="cyberAtack"
      >
        <img :src="require('../../public/images/hacker.svg')" />
      </button>
      <img
        class="flag"
        :src="
          require('../../public/images/flags/' + selectedCountry.id + '.svg')
        "
        :alt="selectedCountry.title"
      />
      <h2 class="country-name">{{ selectedCountry.title }}</h2>
    </template>
    <template #content>
      <p class="country-description">{{ selectedCountry.description }}</p>
      <p class="country-inteligence" v-if="selectedCountry.inteligence">
        Отношение к России: {{ selectedCountry.attToRussia }}
      </p>
      <div v-if="countryHacked">
        <p class="country-resolution-attitude">
          <strong>Отношение к резолюциям</strong><br />
          (вмешаться в итоги внутреннего голосования по резолюциям)<br />
          Очки вмешательства: {{ cyberInfluence.value }}
        </p>
        <div
          v-if="selectedCountry.actualScriptsAtt.length"
          class="attitude-list"
        >
          <p
            v-for="attitude in filteredAttitude()"
            :key="attitude.name"
            class="resolution-attitude"
          >
            <span>{{ attitude.title }}</span>
            <span class="attitude-value">
              <i class="material-icons arrows" @click="changeAtt(attitude, -1)">
                arrow_left
              </i>
              {{ attitude.value }}
              <i class="material-icons arrows" @click="changeAtt(attitude, 1)">
                arrow_right
              </i>
            </span>
          </p>
        </div>
        <p v-else class="country-resolution-attitude">
          Голосование по резолюциям еще не проводилось.
        </p>
      </div>
      <hr />
      <div class="relations-list">
        <label
          class="relation-title"
          v-for="(relation, index) in filteredRelations()"
          :key="index"
        >
          <input
            type="radio"
            v-model="selectedRelation"
            :value="relation"
            :disabled="relationsStatus()"
          />
          {{ relation.title }}
        </label>
      </div>
      <p class="relation-deny" v-if="relationsStatus(selectedCountry.id)">
        Нельзя выполнить более одного действия за ход с одной и той же страной.
      </p>
    </template>
    <template #footer>
      <button
        v-if="selectedRelation && !relationsStatus(selectedCountry.id)"
        class="modal-footer-button"
        @click="initRelation"
      >
        Продолжить
      </button>
    </template>
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
  props: {
    countries: Array,
    relations: Array,
  },
  emits: ["openStat"],
  data() {
    return {
      svgContainer: null,
      hoverCountryColor: "",

      spies: 10,
      hackers: 10,
      cyberAtacks: [],

      selectedRelation: null,
      concludedRelations: [],

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
      // Colorise Map by attitude to Russia
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
          vm.openRelationsDialog(attrs.mapId);
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
    fillColor(color, countries) {
      this.svgContainer.each(function () {
        if (countries.includes(this.attr("mapId"))) {
          this.fill(color);
        }
      });
    },
    openRelationsDialog(countryId) {
      this.selectedCountry = this.countries.find(
        (country) => country.id == countryId
      );
      this.isModalVisible = true;
    },
    relationsStatus() {
      return this.concludedRelations.includes(this.selectedCountry.id);
    },
    filteredRelations() {
      return this.relations.filter((item) => {
        if (this.selectedCountry.hasRelation(item.name)) {
          return false;
        }
        return item.isAvailable(this.selectedCountry);
      });
    },
    initRelation() {
      if (!this.selectedCountry.hasRelation(this.selectedRelation.name)) {
        this.selectedCountry.addRelation(this.selectedRelation);
        this.concludedRelations.push(this.selectedCountry.id);
      }
      this.closeModalWindow();
    },
    clearActions() {
      this.concludedRelations = [];
      this.cyberAtacks = [];
    },
    closeModalWindow() {
      this.selectedRelation = null;
      this.selectedCountry = null;
      this.isModalVisible = false;
    },
    sentSpy() {
      this.spies--;
      this.selectedCountry.plantSpy();
    },
    cyberAtack() {
      this.hackers--;
      this.cyberAtacks.push({
        country: this.selectedCountry.id,
        value: 10,
      });
      const origAtts = this.filteredAttitude().map((att) => {
        return Object.assign({}, att);
      });
      this.selectedCountry["origScriptsAtt"] = [...origAtts];
    },
    filteredAttitude() {
      return this.selectedCountry.initScriptsAtt.filter((attitude) => {
        return this.selectedCountry.actualScriptsAtt.some(
          (script) => script.name == attitude.name
        );
      });
    },
    iterateAtt(attitude, n) {
      switch (n) {
        case 1:
          attitude.value++;
          break;
        case -1:
          attitude.value--;
          break;
      }
    },
    changeAtt(attitude, n) {
      this.iterateAtt(attitude, n);
      const origAttitudes = this.selectedCountry.origScriptsAtt;
      const adsResults = this.filteredAttitude().map((nAtt) => {
        let one = origAttitudes.find((oAtt) => nAtt.name == oAtt.name);
        return Math.abs(nAtt.value - one.value);
      });
      this.cyberInfluence.value = 10 - adsResults.reduce((a, b) => a + b);
      if (this.cyberInfluence.value < 0) {
        n = n * -1;
        this.iterateAtt(attitude, n);
        this.cyberInfluence.value = 0;
      }
    },
  },
  computed: {
    countryHacked() {
      if (this.selectedCountry) {
        return this.cyberAtacks.some(
          (atack) => atack.country == this.selectedCountry.id
        );
      } else {
        return false;
      }
    },
    cyberInfluence() {
      if (this.selectedCountry) {
        return this.cyberAtacks.find(
          (atack) => atack.country == this.selectedCountry.id
        );
      } else {
        return undefined;
      }
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
.country-inteligence,
.country-resolution-attitude {
  text-align: center;
}
.resolution-attitude {
  display: flex;
  justify-content: space-between;
}
.attitude-value {
  min-width: 4rem;
  display: flex;
  justify-content: space-between;
}
.arrows {
  cursor: pointer;
}
.relations-list {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.relation-title {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
}
.relation-title:hover {
  background-color: #99fff1;
  box-shadow: 2px 2px 5px 2px rgba(22, 22, 22, 0.1);
  border-radius: 0.25rem;
  cursor: pointer;
}
.relation-deny {
  color: firebrick;
  text-align: center;
}
</style>
