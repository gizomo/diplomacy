<template>
  <div class="popup-wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup-header">
        <div class="popup-title"><slot name="header"></slot></div>
        <span class="popup-close" @click="closePopUp">
          <i class="material-icons">close</i>
        </span>
      </div>
      <div class="popup-content">
        <slot name="content"></slot>
      </div>
      <div class="popup-footer">
        <slot name="footer">
          <button class="popup-footer-button" @click="closePopUp">
            Продолжить
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    popUpContent: {
      type: Object,
      default() {
        return {
          title: "PopUp",
          button: "Ok",
          content: {},
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    closePopUp() {
      document.body.style.overflow = null;
      this.$emit("closePopUp");
    },
  },
  mounted() {
    const vm = this;
    document.body.style.overflow = "hidden";
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["popup_wrapper"]) {
        vm.closePopUp();
      }
    });
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
  height: 100vh;
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
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.popup-title {
  margin: 0 auto;
}
.popup-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.popup-close {
  position: absolute;
  right: 1rem;
}
.popup-close:hover {
  cursor: pointer;
  color: maroon;
}
</style>
