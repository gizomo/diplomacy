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
  <div class="game-wrapper" v-if="!isIntro">
    <world-map :countries="Countries" @sentSpy="startInteligence" />
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
          v-for="(script, index) in filterScripts(true, false)"
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

  <vue-notification-list position="top-right"></vue-notification-list>
</template>
<script>
import { useNotificationStore } from "@dafcoe/vue-notification";
import "@dafcoe/vue-notification/dist/vue-notification.css";
import Modal from "./Modal";
import WorldMap from "./WorldMap";
import GameData from "../assets/gameData";
import WorldMapData from "../assets/worldRussiaCrimeaLow";
import Country from "../models/Country";
import Vote from "../models/Vote";
import ScriptsCreator from "../models/ScriptsCreator";
import EventsCreator from "../models/EventsCreator";

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
      Events: [],
      Votes: [],

      stages: 9,
      currentStage: 1,

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
      const scriptLauncher = new ScriptsCreator();
      Array.prototype.push.apply(
        this.Scripts,
        scriptLauncher.createAllScripts()
      );
      const eventLauncher = new EventsCreator();
      Array.prototype.push.apply(this.Events, eventLauncher.createAllEvents());
      this.launchEvents(2);
    },
    endStage() {
      if (this.currentStage % 3 == 0) {
        if (this.selectedResolution) {
          this.vote(this.selectedResolution);
          this.selectedResolution = null;
        }
      }
      this.currentStage++;
    },
    endGame() {
      this.isIntro = true;
    },
    filterScripts(active, passed) {
      return this.Scripts.filter(
        (script) => script.active == active && script.passed == passed
      );
    },
    initResolution() {
      this.Countries.forEach((country) =>
        country.setActualScriptAtt(
          this.selectedResolution.title,
          this.selectedResolution.calculateCountryAtt(country)
        )
      );
      this.isResolutionVisible = false;
    },
    vote(resolution) {
      this.Votes.push(new Vote(this.Countries, resolution));
      const voteData = this.Votes.slice(-1)[0];
      let result = "";
      if (voteData.result) {
        resolution.passed = true;
        const scriptIndex = this.Scripts.findIndex(
          (script) => script.title === resolution.title
        );
        this.Scripts.splice(scriptIndex, 1, resolution);
        result = "<p class='ayes'>Резолюция принята</p>";
      } else {
        result = "<p class='nays'>Резолюция не принята</p>";
      }
      let voteResults = `<h3>${voteData.resolution}</h3>
      <div class="votes">
      <p><span class="ayes">За:</span> ${voteData.ayes.length}</p>
      <p><span class="nays">Против:</span> ${voteData.nays.length}</p>
      <p><span class="abstainers">Воздержалось:</span> ${voteData.abstainers.length}</p>
      </div>
      ${result}`;
      this.modalObject.title = "Итоги голосования";
      this.modalObject.body = voteResults;
      this.isModalVisible = true;
    },
    closeModalWindow() {
      this.isModalVisible = false;
      this.isResolutionVisible = false;
    },
    setEvent(gameEvent) {
      const notification = {
        message: gameEvent.description,
        type: "info",
        showIcon: true,
        dismiss: {
          manually: true,
          automatically: true,
        },
        duration: 5000,
        showDurationProgress: true,
        appearance: "light",
      };
      const { setNotification } = useNotificationStore();
      setNotification(notification);
    },
    launchEvents(qty) {
      this.Events.filter((eItem) => eItem.active == false)
        .sort(() => 0.5 - Math.random())
        .slice(0, qty)
        .forEach((filteredE) => {
          this.Events[
            this.Events.findIndex((n) => n.name == filteredE.name)
          ].activateEvent();
          this.setEvent(filteredE);
        });
    },
    startInteligence(countryId) {
      const cIdx = this.Countries.findIndex((c) => c.id == countryId);
      this.Countries[cIdx].inteligence = true;
    },
  },
  watch: {
    currentStage(stage) {
      if ((stage + 1) % 3 == 0) {
        this.isResolutionVisible = true;
      }
      this.launchEvents(3);
    },
  },
};
</script>
<style scoped>
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
.game-wrapper {
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgba(128, 128, 128, 0.5);
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
