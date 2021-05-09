<template>
  <div class="game-intro window" v-if="isIntro">
    <h1 class="game-title center">Я международник</h1>
    <h2 class="game-subtitle center">
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
    <world-map
      :countries="Countries"
      :relations="Relations"
      @openStat="openStatDialog"
      ref="map"
    />
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
        :src="require('/public/images/flags/UN.svg')"
        alt="ООН"
      />
      <h2>Внесите резолюцию на голосование в ООН</h2>
    </template>
    <template #content>
      <div class="resolutions-list">
        <label
          class="resolution-title"
          v-for="(script, index) in filterScripts('player', true, false)"
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
        @click="initPlayerResolution"
      >
        Внести
      </button>
    </template>
  </modal>

  <modal v-if="isRussiaVote" @closeModal="closeModalWindow">
    <template #header>
      <img
        class="flag"
        :src="require('/public/images/flags/UN.svg')"
        alt="ООН"
      />
      <h2>Голосование в ООН</h2>
    </template>
    <template #content>
      <div class="russia-vote center">
        <p>Повестка голосования:</p>
        <h3>{{ currentResolution.optionName }}</h3>
        <div class="russia-vote-options">
          <label>
            <input type="radio" v-model="russiaVote" :value="1" />
            За
          </label>
          <label>
            <input type="radio" v-model="russiaVote" :value="-1" />
            Против
          </label>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        v-if="russiaVote == 0"
        class="modal-footer-button"
        @click="voteForRussia(russiaVote, currentResolution)"
      >
        Воздержаться
      </button>
      <button
        v-else
        class="modal-footer-button"
        @click="voteForRussia(russiaVote, currentResolution)"
      >
        Проголосовать
      </button>
    </template>
  </modal>

  <modal
    v-if="isVoteResults"
    :modalContent="modalObject"
    @closeModal="closeModalWindow"
  >
    <template #header>
      <img
        class="flag"
        :src="require('/public/images/flags/UN.svg')"
        alt="ООН"
      />
      <h2>Итоги голосования в ООН</h2>
    </template>
    <template #footer>
      <button v-if="currentStage == 9" @click="finalResults()">Закрыть</button>
      <button v-else @click="nextStage">Закрыть</button>
    </template>
  </modal>

  <modal v-if="isStatVisible" @closeModal="closeModalWindow">
    <template #header>
      <h2>Статистика игры</h2>
    </template>
    <template #content>
      <div class="sourses">
        <div class="spy-stat center">
          <img :src="require('/public/images/spy.svg')" />
          <p>Осталось шпионов: {{ spies }}</p>
        </div>
        <div class="hacker-stat center">
          <img :src="require('/public/images/hacker.svg')" />
          <p>Осталось кибер-атак: {{ hackers }}</p>
        </div>
      </div>
      <hr />
      <h3 class="center">Резолюции</h3>
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
      <p class="center" v-else>Резолюции еще не выносились на голосование.</p>
    </template>
    <template #footer></template>
  </modal>

  <modal v-if="isFinalResults" @closeModal="closeModalWindow">
    <template #header>
      <h2>Игра закончена</h2>
    </template>
    <template #content>
      <h3 class="center">Итоги голосований за резолюции ООН</h3>
      <p v-for="(vote, index) in Votes" :key="index" class="vote-title">
        {{ vote.resolution }}
        <span v-if="vote.result" :class="{ ayes: vote.result }"> Принята </span>
        <span v-else class="nays">Не принята</span>
      </p>
    </template>
    <template #footer>
      <button class="end-game" @click="endGame">Выйти из игры</button>
    </template>
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
Array.prototype.shuffle = function () {
  return this.map(function (n) {
    return [Math.random(), n];
  })
    .sort()
    .map(function (n) {
      return n[1];
    });
};

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
import RelationsCreator from "../models/RelationsCreator";

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
      Relations: [],
      Scripts: [],
      Events: [],
      Votes: [],
      Notifications: useNotificationStore().notifications,

      stages: 9,
      currentStage: 1,

      isVoteResults: false,
      isFinalResults: false,
      isResolutionVisible: false,
      selectedResolution: null,
      antiResolution: null,

      isRussiaVote: false,
      russiaVote: 0,

      isStatVisible: false,
      votesMore: [],
      spies: 0,
      hackers: 0,

      isModalVisible: false,
      modalObject: {
        title: "",
        body: "",
        button: "Закрыть",
      },
    };
  },
  methods: {
    closeModalWindow() {
      this.isModalVisible = false;
      this.isVoteResults = false;
      this.isResolutionVisible = false;
      this.isStatVisible = false;
    },
    openRules() {
      this.modalObject.title = "Правила игры";
      this.modalObject.body = GameData.rules;
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
      // Generate Sripts
      const scriptLauncher = new ScriptsCreator();
      Array.prototype.push.apply(
        this.Scripts,
        scriptLauncher.createAllScripts()
      );
      // Generate Events
      const eventLauncher = new EventsCreator();
      Array.prototype.push.apply(this.Events, eventLauncher.createAllEvents());
      // Generate Countries
      WorldMapData.countries.forEach((countryData) => {
        this.Countries.push(new Country(countryData, this.Scripts));
      });
      // Generate Relations
      const relationsLauncher = new RelationsCreator();
      Array.prototype.push.apply(
        this.Relations,
        relationsLauncher.createAllRelations()
      );
    },
    nextStage() {
      this.isVoteResults = false;
      this.removeNotifications();
      this.$refs.map.clearActions();
      this.currentStage++;
    },
    endStage() {
      if (this.currentStage % 3 == 0 && this.selectedResolution) {
        this.voteOnResolution(this.selectedResolution);
      } else if ((this.currentStage - 1) % 3 == 0 && this.antiResolution) {
        this.voteOnResolution(this.antiResolution);
      } else {
        this.nextStage();
      }
    },
    finalResults() {
      this.isVoteResults = false;
      this.isFinalResults = true;
    },
    endGame() {
      this.removeNotifications();
      this.Countries = [];
      this.Relations = [];
      this.Scripts = [];
      this.Events = [];
      this.Votes = [];
      this.currentStage = 1;
      this.isFinalResults = false;
      this.isIntro = true;
    },
    filterScripts(type, active, passed) {
      return this.Scripts.filter((script) => {
        if (script.title == "nuclear") {
          script.active = this.Countries.filter((state) =>
            script.nuclearStates.includes(state.id)
          ).every((nuclear) => nuclear.hasRelation("nuclear"));
        }
        return (
          script.type == type &&
          script.active == active &&
          script.passed == passed
        );
      });
    },
    initPlayerResolution() {
      this.calcAttitude(this.selectedResolution);
      this.isResolutionVisible = false;
    },
    calcAttitude(resolution) {
      this.Countries.forEach((country) =>
        country.setActualScriptAtt(
          resolution.title,
          resolution.calculateCountryAtt(country, this.Events)
        )
      );
    },
    voteOnResolution(resolution) {
      this.calcAttitude(resolution);
      this.isRussiaVote = true;
    },
    voteForRussia(vote, resolution) {
      let rus = this.Countries.find((country) => country.id == "RU");
      rus.setActualScriptAtt(resolution.title, vote);
      this.russiaVote = 0;
      this.isRussiaVote = false;
      this.vote(resolution);
      this.russiaVote = 0;
      if (this.selectedResolution == resolution) {
        this.selectedResolution = null;
      }
      if (this.antiResolution == resolution) {
        this.antiResolution = null;
      }
    },
    vote(resolution) {
      this.Votes.push(new Vote(this.Countries, resolution));
      const voteData = this.Votes.slice(-1)[0];
      let result = "";
      if (voteData.result) {
        this.Scripts.find(
          (script) => script.title == resolution.title
        ).passed = true;
        result = "<p class='ayes'>Резолюция принята</p>";
      } else {
        result = "<p class='nays'>Резолюция не принята</p>";
      }
      this.Countries.forEach((country) =>
        country.removeActualScriptAtt(resolution.title)
      );
      let voteResults = `<h3>${voteData.resolution}</h3>
      <div class="votes">
      <p><span class="ayes">За:</span> ${voteData.ayes.length}</p>
      <p><span class="nays">Против:</span> ${voteData.nays.length}</p>
      <p><span class="abstainers">Воздержалось:</span> ${voteData.abstainers.length}</p>
      </div>
      ${result}`;
      this.modalObject.body = voteResults;
      this.isVoteResults = true;
    },
    launchEvents(qty) {
      let delay = 300;
      const vm = this;
      this.Events.filter((eItem) => eItem.active == false)
        .shuffle()
        .slice(0, qty)
        .forEach((filteredE) => {
          filteredE.activateEvent(this.Relations, this.$refs.map.fillColor);
          setTimeout(() => {
            vm.eventNotify(filteredE.description);
          }, delay);
          delay += 300;
        });
    },
    eventNotify(message, type = "info") {
      const notification = {
        message: message,
        type: type,
        showIcon: true,
        dismiss: {
          manually: true,
          automatically: true,
        },
        duration: 20000,
        showDurationProgress: true,
        appearance: "light",
      };
      const { setNotification } = useNotificationStore();
      setNotification(notification);
    },
    removeNotifications() {
      if (!Object.keys(this.Notifications).length == 0) {
        for (let id in this.Notifications) {
          useNotificationStore().unsetNotification(id);
        }
      }
    },
  },
  computed: {
    currentResolution() {
      return this.selectedResolution == null
        ? this.antiResolution
        : this.selectedResolution;
    },
  },
  watch: {
    currentStage(stage) {
      if ((stage + 1) % 3 == 0) {
        // Introduce Player`s resolution
        let vm = this;
        setTimeout(() => {
          vm.isResolutionVisible = true;
        }, 1000);
      }
      if (stage % 3 == 0 && stage != 9) {
        // Introduce AI resolution
        this.antiResolution = this.filterScripts("anti", false, false)
          .shuffle()
          .splice(0, 1)[0];
        if (this.antiResolution) {
          this.antiResolution.active = true;
          this.calcAttitude(this.antiResolution);
          // this.modalObject.title =
          //   "На голосование ООН была предложена резолюция.";
          // this.modalObject.body = `<div style="text-align: center"><h4>${this.antiResolution.optionName}</h4><p>Голосование пройдет через два хода.</p></div>`;
          // this.isModalVisible = true;
          const message = `На голосование ООН была предложена резолюция "${this.antiResolution.optionName}". Голосование пройдет через два хода.`;
          this.eventNotify(message, "warning");
        }
      }
      this.launchEvents(4);
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
.hacker-stat img,
.spy-stat img {
  height: 3rem;
}
.center {
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
  box-shadow: 2px 2px 5px 2px rgba(22, 22, 22, 0.1);
  border-radius: 0.25rem;
  cursor: pointer;
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
