<template>
  <div class="wave-wrapp">
    <div class="circles"></div>
    <div class="circles"></div>
    <div class="wave"></div>
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
  border-radius: 0.5rem;
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
  position: fixed;
  z-index: -1;
  overflow: hidden;
}
.circles {
  background: url("./assets/circles.svg") repeat-y;
  position: absolute;
  top: 0;
  width: 100%;
  height: 800vh;
}
.circles:nth-of-type(1) {
  animation: wave 20s cubic-bezier(0.56, 0.65, 0.43, 0.33) -0.25s infinite;
  opacity: 0.4;
}
.circles:nth-of-type(2) {
  top: -2000px;
  animation: wave 50s cubic-bezier(0.56, 0.65, 0.43, 0.33) -0.25s infinite;
  opacity: 0.6;
}
.wave {
  background: url("./assets/wave.svg") repeat-y;
  position: absolute;
  width: 100%;
  height: 800vh;
}
.wave:nth-of-type(3) {
  top: 0;
  animation: wave 40s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.25s infinite,
    swull 20s ease -0.25s infinite;
  opacity: 0.15;
}
.wave:nth-of-type(4) {
  top: -2000px;
  animation: wave 30s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.25s infinite,
    swell 60s ease -0.25s infinite;
  opacity: 0.3;
}
@keyframes wave {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: -4000px;
  }
}
@keyframes swell {
  0%,
  100% {
    transform: translate3d(-350px, 0, 0);
  }
  50% {
    transform: translate3d(15px, 150px, 0);
  }
}
@keyframes swull {
  0%,
  100% {
    transform: translate3d(150px, 15px, 0);
  }
  50% {
    transform: translate3d(25px, 0, 0);
  }
}
</style>
