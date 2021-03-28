<template>
  <div class="main-wrapper">
    <div class="intro" v-if="isIntro">
      <h1 class="game-title">Почувствуй себя дипломатом</h1>
      <h2 class="game-subtitle">
        Открой для себя особенности современной мировой политики
      </h2>
      <hr />
      <p>
        1755 год. Европа стоит на пороге войны: Англия соперничает с Францией за
        североамериканские колонии; у Австрии очень плохие отношения с Пруссией.
        Европейские страны ведут свою сложную дипломатическую игру — всем
        понятно, что в результате скорой войны баланс сил и государственные
        границы в Европе изменятся, и каждому важно найти себе правильных
        друзей, чтобы оказаться в итоге в числе победителей. России тоже
        необходимо срочно определить свою позицию в запутанных дипломатических
        отношениях.
      </p>
      <p>
        Вас неожиданно назначают новым главой дипломатической службы, невзирая
        на отсутствие у вас должного опыта, — предыдущий президент Коллегии
        иностранных дел, опытный канцлер Алексей Петрович Бестужев-Рюмин, попал
        в немилость к государыне-императрице Елизавете Петровне. Теперь именно
        вы призваны упрочить положение России в Европе и сформировать устойчивый
        политический альянс в условиях Семилетней войны. Постарайтесь выяснить,
        с какими странами у нас есть общие интересы, и заключить как можно
        больше военно-политических союзов. Дерзайте, в ваших силах изменить ход
        истории!
      </p>
      <div class="game-menu">
        <button class="open-rules" @click="openRules">Правила игры</button>
        <button class="start-game" @click="startGame">Начать игру</button>
      </div>
    </div>
    <div class="map-wrapper" v-if="!isIntro">
      <world-map />
    </div>
    <div class="game-footer" v-if="!isIntro">
      <button class="end-game" @click="endGame">Выйти из игры</button>
    </div>
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
      this.modalObject.body = `<ul><li>На карте Европы отмечены восемь стран, с которыми можно взаимодействовать в ходе игры. Задача игрока — заключить как можно больше военно-политических союзов с любыми из них.</li>
    <li>Игра продолжается семь ходов. В начале каждого из них игрок получает сообщение о том, как изменилась историческая ситуация с предыдущего хода.</li>
    <li>После этого игроку предлагается совершить действия по отношению к любым трем странам из восьми: он может объявлять войну, вводить торговое эмбарго и делать разные дипломатические предложения (в том числе предложение заключить союз).</li>
    <li>Каждая страна может принять или не принять сделанное ей предложение — это зависит от ее отношения к России. Разные действия требуют разного уровня доверия.</li>
    <li>Отношение к России оценено в условных единицах (от –5 до +5). Узнать его можно, отправив в нужную страну шпиона. За ход это можно сделать только один раз.</li>
    <li>В начале игры отношение каждой страны к России обусловлено историческими причинами. По ходу игры оно меняется в зависимости от предложений, которые игрок делает как самой стране, так и ее друзьям и врагам. Это значит, что по ходу игры становятся возможными некоторые действия, невозможные в начале, — и наоборот.</li>
    <li>Страна может разорвать союз с Россией в случае невыполнения игроком союзни­ческих обязательств. Чем больше военно-политических союзов будет у России на конец седьмого хода, тем более успешным можно считать прохождение игры.</li></ul>`;
      this.isModalVisible = true;
    },
    startGame() {
      this.isIntro = false;
    },
    endGame() {
      this.isIntro = true;
    },
    closeModalWindow() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style scoped>
.main-wrapper {
  padding: 3rem;
}
.map-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
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
.game-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.game-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
