<template>
  <div class="wave-wrapp">
    <div class="wave"></div>
  </div>
  <prof-orient />
  <diplomacy-game v-if="false" />
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
};
</script>

<style>
body {
  position: relative;
  margin: 0;
  font-family: "Exo 2", sans-serif;
  color: #4a4a4a;
  /* background: content-box url("./assets/bg.svg");
  background-size: 100% auto; */
}
h1,
h2,
h3 {
  color: #1e43e7;
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
  border-radius: 0.3rem;
  cursor: pointer;
}
button:hover {
  transition: all 0.3s ease-in-out;
  opacity: 0.7;
  transform: translate3d(0, 0, 0);
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(2, 100, 242, 0.2);
}
.wave-wrapp {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -1;
  overflow: hidden;
}
.wave {
  background: url("./assets/bg.svg") repeat-y;
  background-size: cover;
  position: absolute;
  width: 100vw;
  top: 0;
  height: 800vh;
  animation: wave 10s linear infinite;
  transform: translate3d(0, 0, 0);
}
@keyframes wave {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: -400vh;
  }
}
</style>
