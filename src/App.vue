<template>
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
}
hr {
  margin: 3rem;
  color: #f2f2f2;
}
button {
  width: 12rem;
  height: 3rem;
  margin: 1rem;
  font-weight: 600;
  background-color: white;
  border: 2px solid rgb(39, 39, 39);
  cursor: pointer;
}
button:hover {
  transition: all 0.2s;
  opacity: 0.6;
  transform: translate3d(0, 0, 0);
}
</style>
