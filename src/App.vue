<template>
  <div class="main-wrapper">
    <div class="main-menu" v-if="menu">
      <div class="edu window">
        <div class="content">
          <h1>Выбери свою профессию будущего</h1>
          <p>
            Узнай, какие профессии будут востребованы в будущем. Выбери полезные
            профессиональные навыки. Следи за современными трендами. Найди свою
            образовательную программу на Факультете исторических и политических
            наук НИ ТГУ.
          </p>
          <div class="buttons">
            <button @click="startEdu">Перейти</button>
          </div>
        </div>
        <div class="image">
          <img :src="require('../public/images/fipn.png')" />
        </div>
      </div>
      <div class="game window">
        <div class="content">
          <h1>Я - международник</h1>
          <p>
            Хочешь узнать, какой из тебя международник? Попробуй свои силы в
            интерактивной игре о международных отношениях. Защити интересы
            России на мировой арене.
          </p>
          <div class="buttons">
            <button @click="startGame">Играть</button>
          </div>
        </div>
        <div class="image">
          <img :src="require('../public/images/inter.png')" />
        </div>
      </div>
    </div>
    <prof-orient v-if="edu" @backToMenu="startMenu" />
    <diplomacy-game v-if="game" @backToMenu="startMenu" />
  </div>
</template>
<script>
import DiplomacyGame from "./components/DiplomacyGame";
import ProfOrient from "./components/ProfOrient";

export default {
  name: "App",
  components: {
    DiplomacyGame,
    ProfOrient,
  },
  data() {
    return {
      menu: true,
      edu: false,
      game: false,
    };
  },
  methods: {
    startEdu() {
      this.menu = false;
      this.edu = true;
    },
    startGame() {
      this.menu = false;
      this.game = true;
    },
    startMenu() {
      this.menu = true;
      this.edu = false;
      this.game = false;
    },
  },
};
</script>
<style>
body {
  position: relative;
  margin: 0;
  font-family: "Exo 2", sans-serif;
  color: #4a4a4a;
  background-color: #34338e;
}
h1,
h2,
h3 {
  color: steelblue;
}
a {
  color: #6194ff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
hr {
  margin: 3rem;
  color: #f2f2f2;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}
button {
  width: 12rem;
  height: 4.1rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #fafcff;
  background-color: #dc5a12;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
button:hover {
  transition: all 0.3s ease-in-out;
  filter: brightness(120%);
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(2, 100, 242, 0.2);
}
.votes {
  display: flex;
  gap: 1rem;
}
.ayes {
  white-space: nowrap;
  color: forestgreen;
}
.nays {
  white-space: nowrap;
  color: firebrick;
}
.abstainers {
  white-space: nowrap;
  color: grey;
}
.main-wrapper {
  padding: 3rem;
}
.main-menu {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.window {
  min-width: 20rem;
  width: 60vw;
  margin: 0 auto;
  padding: 3rem;
  background-color: #fafcff;
  border-radius: 3rem;
  box-shadow: 0px 25px 20px rgba(2, 100, 242, 0.2);
}
.edu,
.game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.game div:first-child {
  order: 1;
}
.content h1 {
  font-size: 2.5rem;
  color: #0f46e1;
}
.content p {
  padding: 2rem;
  line-height: 1.5rem;
}
.image {
  display: flex;
  align-items: center;
}
.image img {
  width: 100%;
}
</style>
