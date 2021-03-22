<template>
  <div class="popup">
    <div class="popup__header">
      <span>Popup</span>
      <span class="popup__close" @click="closePopUp">Close</span>
    </div>
    <div class="popup__content">
      <slot></slot>
    </div>
    <div class="popup__footer">
      <button class="popup__footer-button">Button</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  data() {
    return {};
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 2rem;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 1rem;
  width: 50vw;
  background-color: white;
  border: 1px solid #2e2e2e;
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(128, 128, 128, 0.5);
}
.popup__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup__close:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
