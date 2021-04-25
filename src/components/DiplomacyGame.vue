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
      <button class="return" @click="$emit('backToMenu')">
        Вернуться в меню
      </button>
    </div>
  </div>
  <div class="game-wrapper" v-if="!isIntro">
    <world-map :countries="Countries" @openStat="openStatDialog" ref="map" />
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
      <img
        class="flag"
        :src="require('../../public/images/flags/UN.svg')"
        alt="ООН"
      />
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

  <modal v-if="isStatVisible" @closeModal="closeModalWindow">
    <template #header>
      <h2>Статистика игры</h2>
    </template>
    <template #content>
      <div class="sourses">
        <div class="spy-stat">
          <img :src="require('../../public/images/spy.svg')" />
          <p>Осталось шпионов: {{ spies }}</p>
        </div>
        <div class="hacker-stat">
          <img :src="require('../../public/images/hacker.svg')" />
          <p>Осталось кибер-атак: {{ hackers }}</p>
        </div>
      </div>
      <hr />
      <h3 class="stat-resolutions-title">Резолюции</h3>
      <ul class="vote-results" v-if="Votes.length">
        <li v-for="(vote, index) in Votes" :key="index">
          <p class="vote-title" @click="votesMore[index] = !votesMore[index]">
            {{ vote.resolution }}
            <span class="ayes" v-if="vote.result">(принята)</span>
            <span class="nays" v-else>(не принята)</span>
          </p>
          <div class="vote-results-more" v-if="votesMore[index]">
            <div class="votes-list">
              <span class="ayes">За {{ vote.ayes.length }}</span>
              <span v-for="(yes, idxy) in vote.ayes" :key="idxy">
                {{ yes }}
              </span>
            </div>
            <div class="votes-list">
              <span class="nays">Против {{ vote.nays.length }}</span>
              <span v-for="(no, idxn) in vote.nays" :key="idxn">
                {{ no }}
              </span>
            </div>
            <div class="votes-list">
              <span class="abstainers">
                Воздержались {{ vote.abstainers.length }}
              </span>
              <span v-for="(abstainers, idxa) in vote.abstainers" :key="idxa">
                {{ abstainers }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <p class="no-votes" v-else>Резолюции еще не выносились на голосование.</p>
    </template>
    <template #footer></template>
  </modal>

  <modal
    v-if="isModalVisible"
    :modalContent="modalObject"
    @closeModal="closeModalWindow"
  >
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
  emits: ["backToMenu"],
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

      isStatVisible: false,
      votesMore: [],
      spies: 0,
      hackers: 0,

      isResolutionVisible: false,
      selectedResolution: null,

      isModalVisible: false,
      modalObject: {
        imageTitle: Boolean,
        title: String,
        body: String,
        button: String,
      },
    };
  },
  methods: {
    openRules() {
      this.modalObject.title = "Правила игры";
      this.modalObject.body = GameData.rules;
      this.modalObject.button = "Закрыть";
      this.isModalVisible = true;
    },
    openStatDialog(e) {
      this.spies = e.spies;
      this.hackers = e.hackers;
      this.votesMore.fill(false, 0, this.Votes.length);
      this.isStatVisible = true;
    },
    startGame() {
      this.isIntro = false;
      const scriptLauncher = new ScriptsCreator();
      Array.prototype.push.apply(
        this.Scripts,
        scriptLauncher.createAllScripts()
      );
      const eventLauncher = new EventsCreator();
      Array.prototype.push.apply(this.Events, eventLauncher.createAllEvents());
      this.launchEvents(2);
      WorldMapData.countries.forEach((countryData) => {
        this.Countries.push(new Country(countryData, this.Scripts));
      });
    },
    endStage() {
      if (this.currentStage % 3 == 0) {
        if (this.selectedResolution) {
          this.vote(this.selectedResolution);
          this.selectedResolution = null;
        }
      }
      this.$refs.map.clearActions();
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
      this.modalObject.imageTitle = true;
      this.modalObject.title = "Итоги голосования в ООН";
      this.modalObject.body = voteResults;
      this.modalObject.button = "Закрыть";
      this.isModalVisible = true;
    },
    closeModalWindow() {
      this.isModalVisible = false;
      this.isResolutionVisible = false;
      this.isStatVisible = false;
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
        duration: 10000,
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
  color: #000;
  background-color: #00efd1;
  border: 1px solid #fff;
}
.sourses {
  display: flex;
  justify-content: space-around;
}
.hacker-stat,
.spy-stat {
  text-align: center;
}
.hacker-stat img,
.spy-stat img {
  height: 3rem;
}
.stat-resolutions-title,
.no-votes {
  text-align: center;
}
.vote-results {
  list-style: none;
  padding: 0;
}
.vote-title {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: 1px solid #f7f7f7;
  cursor: pointer;
}
.vote-title:hover {
  background-color: #99fff1;
}
.vote-results-more {
  max-height: 20rem;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  font-size: 0.8rem;
  overflow-y: scroll;
}
.votes-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
.flag {
  display: block;
  width: 9rem;
  margin: 0 auto;
}
</style>
