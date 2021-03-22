<template>
  <div class="popup-wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup__header">
        <span>{{ popUpTitle }}</span>
        <span class="popup__close" @click="closePopUp">Close</span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="popup__footer-button">Button</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    popUpTitle: {
      type: String,
      default: "PopUp Title",
    },
  },
  data() {
    return {};
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    },
  },
  mounted() {
    const vm = this;
    document.addEventListener('click', function(item) {
      if(item.target === vm.$refs['popup_wrapper']) {
        vm.closePopUp();
      }
    })
  },
};
</script>

<style scoped>
.popup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.4);
}
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
