<template>
  <div class="game-intro window" v-if="isIntro">
    <h1 class="game-title">Почувствуй себя международником</h1>
    <h2 class="game-subtitle">
      Открой для себя особенности современной мировой политики
    </h2>
    <hr />
    <div v-html="intro"></div>
    <div class="buttons">
      <button class="open-rules" @click="openRules">Правила игры</button>
      <button class="start-game" @click="startGame">Начать игру</button>
    </div>
  </div>
  <div class="map-wrapper" v-if="!isIntro">
    <world-map />
    <div class="stages">
      <p
        v-for="stage in stages"
        :key="stage"
        class="stage"
        :class="{
          completed: stage < currentStage,
          current: stage == currentStage,
        }"
      >
        Раунд {{ stage }}
      </p>
    </div>
  </div>
  <div class="buttons" v-if="!isIntro">
    <button class="end-stage" v-if="currentStage <= stages" @click="endStage">
      Завершить ход
    </button>
    <button class="end-game" @click="endGame">Выйти из игры</button>
  </div>

  <modal v-if="isResolutionVisible" @closeModal="closeModalWindow">
    <template #header>
      <h2>Внесите резолюцию на голосование в ООН</h2>
    </template>
    <template #content>
      <div class="resolutions-list">
        <label
          class="resolution-title"
          v-for="(script, index) in Scripts"
          :key="index"
        >
          <input type="radio" v-model="selectedResolution" :value="script" />
          {{ script.optionName }}
        </label>
      </div>
    </template>
    <template #footer>
      <button
        v-if="selectedResolution"
        class="modal-footer-button"
        @click="initResolution"
      >
        Внести
      </button>
    </template>
  </modal>

  <modal v-if="isModalVisible" @closeModal="closeModalWindow">
    <template #header>
      <h2>{{ modalObject.title }}</h2>
    </template>
    <template #content>
      <div v-html="modalObject.body"></div>
    </template>
    <template #footer></template>
  </modal>
</template>
<script>
import WorldMap from "./WorldMap";
import GameData from "../assets/gameData";
import WorldMapData from "../assets/worldRussiaCrimeaLow";
import Country from "../models/Country";
import Vote from "../models/Vote";
import ScriptsCreator from "../models/ScriptsCreator";
import Modal from "./Modal";

export default {
  name: "DiplomacyGame",
  components: {
    WorldMap,
    Modal,
  },
  data() {
    return {
      isIntro: true,
      intro: GameData.intro,

      Countries: [],
      Scripts: [],
      Votes: [],

      stages: 9,
      currentStage: 1,
      // countries: WorldMapData.countries,

      isResolutionVisible: false,
      selectedResolution: null,

      isModalVisible: false,
      modalObject: {
        title: String,
        body: String,
      },
    };
  },
  methods: {
    openRules() {
      this.modalObject.title = "Правила игры";
      this.modalObject.body = GameData.rules;
      this.isModalVisible = true;
    },
    startGame() {
      this.isIntro = false;
      WorldMapData.countries.forEach((countryData) => {
        this.Countries.push(new Country(countryData));
      });
    },
    endStage() {
      this.currentStage++;
    },
    endGame() {
      this.isIntro = true;
    },
    vote() {
      const filteredScripts = this.Scripts.filter(
        (script) => script.active == true
      );
      filteredScripts.forEach((script) => {
        this.Votes.push(new Vote(this.Countries, script));
      });
    },
    chooseResolution() {
      const scriptLauncher = new ScriptsCreator();
      this.Scripts.push(scriptLauncher.createScript("bitcoin"));
      this.Scripts.push(scriptLauncher.createScript("space"));
      this.isResolutionVisible = true;
    },
    initResolution() {
      this.selectedResolution.active = true;
      console.log(this.selectedResolution.active);
      const scriptIndex = this.Scripts.findIndex(
        (script) => script.title === this.selectedResolution.title
      );
      this.Scripts.splice(scriptIndex, 1, this.selectedResolution);
      this.Countries.forEach((country) =>
        country.setActualScriptAtt(
          this.selectedResolution.title,
          this.selectedResolution.calculateCountryAtt(country)
        )
      );
      this.selectedResolution = null;
      this.isResolutionVisible = false;
      this.vote();
      let vm = this;
      setTimeout(() => {
        vm.voteResults();
      }, 3000);
    },
    voteResults() {
      const voteData = this.Votes.slice(-1)[0];
      console.log(voteData);
      let result = "";
      if (voteData.ayes.length > voteData.nays.length) {
        result = "Резолюция принята";
      } else {
        result = "Резолюиция не принята";
      }
      const resolution = this.Scripts.find(
        (script) => script.title === voteData.resolution
      );
      let voteResults = `<h3>${resolution.optionName}</h3>
      <div class="votes">
      <p>За: <span>${voteData.ayes.length}</span></p>
      <p>Против: <span>${voteData.nays.length}</span></p>
      <p>Воздержалось: <span>${voteData.abstainers.length}</span></p>
      </div>
      <p>${result}</p>`;
      this.modalObject.title = "Итоги голосования";
      this.modalObject.body = voteResults;
      this.isModalVisible = true;
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
  },
  watch: {
    currentStage(stage) {
      if (stage % 3 == 0) {
        this.chooseResolution();
        // this.vote();
      }
    },
  },
};
</script>
<style scoped>
/* .map-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
} */
.intro {
  width: 50vw;
  margin: 0 auto;
}
.game-title {
  font-size: 3rem;
}
.game-title,
.game-subtitle {
  text-align: center;
}
.game-subtitle {
  font-weight: 300;
}
.stages {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background-color: #fff;
}
.stage {
  margin: 0;
  padding: 1rem 0;
  color: #808080;
  text-align: center;
  border: 1px solid #808080;
}
.completed {
  color: #fff;
  background-color: dodgerblue;
  border: 1px solid #fff;
}
.current {
  color: #fff;
  background-color: orangered;
  border: 1px solid #fff;
}
.resolutions-list {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.resolution-title {
  font-weight: 600;
}
</style>
