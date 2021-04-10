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

      stages: 9,
      currentStage: 1,
      countries: WorldMapData.countries,

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
    },
    endStage() {
      this.currentStage++;
    },
    endGame() {
      this.isIntro = true;
    },
    vote() {
      let voteSum = 0;
      this.countries.forEach((country) => {
        if (country.scripts) {
          voteSum += country.scripts[0];
        }
      });
      console.log(voteSum);
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
  },
  watch: {
    currentStage(stage) {
      if (stage % 3 == 0) {
        this.vote();
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
</style>
