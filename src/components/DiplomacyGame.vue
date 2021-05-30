<template>
  <div class="game-intro window" v-if="isIntro">
    <h1 class="game-title center">Я - международник</h1>
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
    <button v-if="currentStage == 10" @click="finalResults()">
      Итоги игры
    </button>
    <button class="end-game" @click="endGame">Выйти из игры</button>
    <button v-if="currentStage != 10" class="open-rules" @click="openRules">
      Правила игры
    </button>
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
          <svg-icon
            :svgId="'spy'"
            :size="[50, 50]"
            :viewbox="[0, 0, 100, 100]"
            :path="icons.spy"
            :fill="'#000'"
          />
          <p>Осталось шпионов: {{ spies }}</p>
        </div>
        <div class="hacker-stat center">
          <svg-icon
            :svgId="'hacker'"
            :size="[50, 50]"
            :viewbox="[0, 0, 100, 100]"
            :path="icons.hacker"
            :fill="'#000'"
          />
          <p>Осталось кибер-атак: {{ hackers }}</p>
        </div>
      </div>
      <hr />
      <h3 class="center">Отношения со странами мира</h3>
      <div class="relations-list">
        <div class="relations-positive">
          <div
            class="relation"
            v-for="(relation, idx) in sortedRelations(1)"
            :key="idx"
          >
            <svg-icon
              :svgId="'positive_' + idx"
              :size="[30, 30]"
              :viewbox="[0, 0, 100, 100]"
              :path="relation.icon"
              :fill="$refs.map.iconFillColor(relation.score)"
              v-tooltip="relation.statInfo"
            />
            <span>{{ relationsCount(relation.name) }}</span>
          </div>
        </div>
        <div class="relations-neutral">
          <div
            class="relation"
            v-for="(relation, idx) in sortedRelations(0)"
            :key="idx"
          >
            <svg-icon
              :svgId="'neutral_' + idx"
              :size="[30, 30]"
              :viewbox="[0, 0, 100, 100]"
              :path="relation.icon"
              :fill="$refs.map.iconFillColor(relation.score)"
              v-tooltip="relation.statInfo"
            />
            <span>{{ relationsCount(relation.name) }}</span>
          </div>
        </div>
        <div class="relations-negative">
          <div
            class="relation"
            v-for="(relation, idx) in sortedRelations(-1)"
            :key="idx"
          >
            <svg-icon
              :svgId="'negative_' + idx"
              :size="[30, 30]"
              :viewbox="[0, 0, 100, 100]"
              :path="relation.icon"
              :fill="$refs.map.iconFillColor(relation.score)"
              v-tooltip="relation.statInfo"
            />
            <span>{{ relationsCount(relation.name) }}</span>
          </div>
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
      <h1 class="ayes center" v-if="victory">Победа!</h1>
      <h1 class="abstainers center" v-else>Поражение</h1>
      <p v-if="victory">
        Вы молодец! Вам удалось защитить интересы России на мировой арене.
      </p>
      <p v-if="!victory">
        Не растраивайтесь. Даже опытным дипломатам не всегда удается добиваться
        намеченых целей с первого раза.
      </p>
      <p>
        Мы проанализировали ваши действия во время игры. Если хотите достичь
        лучших результатов обратите внимание на наши рекомендации.
      </p>
      <p v-if="hackers < 2">
        Старайтесь действовать менее прямолинейно. Чтобы разобраться во всем
        разнообразии взаимосвязей мировой политики, необходимо мыслить системно.
      </p>
      <p
        v-if="
          spies < 2 ||
          Scripts.find((script) => script.title == 'nuclear').active == false
        "
      >
        Подробнее изучайте информацию о странах и следите за обстановкой в мире.
      </p>
      <p
        v-if="
          relationsCount('agression') > 5 || relationsCount('sanctions') > 7
        "
      >
        Старайтесь действовать менее агрессивно в отношении других государств.
        Критически относитесь к своим поступкам. Санкции или угрозы применения
        силы могут спровоцировать другие страны к ответным действиям.
      </p>
      <p
        v-if="
          relationsCount('emergency') < 3 ||
          relationsCount('epidemic') < 3 ||
          relationsCount('military') < 1
        "
      >
        Международные отношения - очень динамичная среда. Внимательно следите за
        происходящими событиями. Не оставайтесь в стороне - помогайте другим
        странам в сложных ситуациях, если рассчитываете заручиться их поддержкой
        в будущем.
      </p>
      <p v-if="relationsCount('space') < 3 || relationsCount('atom') < 3">
        Старайтесь использовать весь потенциал своей страны, чтобы наладить
        отношения с как можно большим количеством государств. Вам может
        понадобиться их поддержка в будущем.
      </p>
      <p v-if="relationsCount('borders') > 7 || relationsCount('dutes') > 7">
        С осторожностью выбирайте своих союзников. Предоставление чрезмерных
        преференций другим странам может свидетельствовать о вашей слабости. К
        тому же умение расставлять приоритеты может существенно сэкономить ваши
        ресурсы.
      </p>
      <p v-if="filterVotes('player').length == 0">
        Очень жаль, что вы не попытались побороться за интересы своей страны на
        международной арене. Может вам больше подходит внутриполитическая,
        научная или общественная деятельность.
      </p>
      <h3 class="center">Итоги голосований за резолюции ООН</h3>
      <h4 v-if="filterVotes('player').length">
        Резолюции, инициированные Россией:
      </h4>
      <p
        v-for="(vote, index) in filterVotes('player')"
        :key="index"
        class="vote-title"
      >
        {{ vote.resolution }}
        <span v-if="vote.result" :class="{ ayes: vote.result }"> Принята </span>
        <span v-else class="nays">Не принята</span>
      </p>
      <h4 v-if="filterVotes('anti').length">
        Резолюции, инициированные другими странами:
      </h4>
      <p
        v-for="(vote, index) in filterVotes('anti')"
        :key="index"
        class="vote-title"
      >
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
import SvgIcon from "./SvgIcon";
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
    SvgIcon,
    Modal,
  },
  emits: ["backToMenu"],
  data() {
    return {
      isIntro: true,
      intro: GameData.intro,
      icons: GameData.icons,

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
      this.selectedResolution = null;
      this.antiResolution = null;
      this.currentStage = 1;
      this.isFinalResults = false;
      this.isIntro = true;
    },
    sortedRelations(relationsType) {
      if (relationsType > 0)
        return this.Relations.filter((relation) => relation.score > 0);
      if (relationsType == 0)
        return this.Relations.filter((relation) => relation.score == 0);
      if (relationsType < 0)
        return this.Relations.filter((relation) => relation.score < 0);
    },
    filterScripts(type, active, passed) {
      return this.Scripts.filter((script) => {
        if (script.title == "nuclear") {
          script.active = this.Countries.filter((state) =>
            script.nuclearStates.includes(state.id)
          ).every((nuclear) => nuclear.hasRelation("nuclear"));
        }
        if (script.title == "expulsion") {
          script.active =
            this.relationsCount("sanctions") > 5 &&
            this.relationsCount("agression") > 5;
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
      if (voteData.title == "expulsion" && voteData.result) {
        voteResults +=
          "<p style='text-align: center; color: firebrick'>Россия исключена из состава СБ ООН, поэтому вы больше не можете вносить резолюции на голосование в ООН.</p>";
      }
      this.modalObject.body = voteResults;
      this.isVoteResults = true;
    },
    filterVotes(type) {
      return this.Votes.filter((vote) => vote.type == type);
    },
    relationsCount(relation) {
      return this.Countries.filter((country) => country.hasRelation(relation))
        .length;
    },
    launchEvents(qty) {
      let delay = 0;
      const vm = this;
      this.Events.filter((eItem) => eItem.active == false)
        .shuffle()
        .slice(0, qty)
        .forEach((filteredE) => {
          filteredE.activateEvent(
            this.Relations,
            this.$refs.map.countryFillColor
          );
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
    resolutionBlock() {
      const expulsion = this.Votes.find((vote) => vote.title == "expulsion");
      if (expulsion) {
        return expulsion.result;
      } else {
        return false;
      }
    },
    victory() {
      const playerVotes = this.Votes.filter(
        (vote) => vote.type == "player" && vote.result == true
      );
      const antiVotes = this.Votes.filter(
        (vote) => vote.type == "anti" && vote.result == true
      );
      return playerVotes.length > antiVotes.length;
    },
  },
  watch: {
    currentStage(stage) {
      if ((stage + 1) % 3 == 0 && !this.resolutionBlock) {
        // Introduce Player`s resolution
        let vm = this;
        setTimeout(() => {
          vm.isResolutionVisible = true;
        }, 1000);
      }
      if (stage % 3 == 0 && stage != 9) {
        // Introduce AI resolution
        const filteredAntiRes = this.filterScripts("anti", true, false);
        if (filteredAntiRes.find((antiRes) => antiRes.title == "expulsion")) {
          this.antiResolution = filteredAntiRes.find(
            (antiRes) => antiRes.title == "expulsion"
          );
        } else {
          this.antiResolution = filteredAntiRes.shuffle().splice(0, 1)[0];
        }
        if (this.antiResolution) {
          this.antiResolution.active = true;
          this.calcAttitude(this.antiResolution);
          let message = "";
          if (this.antiResolution.title == "expulsion") {
            message =
              "Члены Совета безопасности ООН предложили исключить Россию из своего состава в ответ на ее агрессивные действия в отношении ряда государств. Голосование пройдет через два хода.";
            this.eventNotify(message, "alert");
          } else {
            message = `На голосование ООН была предложена резолюция "${this.antiResolution.optionName}". Голосование пройдет через два хода.`;
            this.eventNotify(message, "warning");
          }
        }
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
.game-subtitle {
  font-weight: 300;
}
.game-wrapper {
  overflow: hidden;
  border-radius: 0.5rem;
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
.relations-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.relation {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem;
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
