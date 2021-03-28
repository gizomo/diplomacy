<template>
  <div class="modal-wrapper" ref="modal_wrapper">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title"><slot name="header"></slot></div>
        <span class="modal-close" @click="closeModal">
          <i class="material-icons">close</i>
        </span>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button class="modal-footer-button" @click="closeModal">
            Продолжить
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modalContent: {
      type: Object,
      default() {
        return {
          title: "Модальное окно",
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
    closeModal() {
      document.body.style.overflow = null;
      this.$emit("closeModal");
    },
  },
  mounted() {
    const vm = this;
    document.body.style.overflow = "hidden";
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["modal_wrapper"]) {
        vm.closeModal();
      }
    });
  },
};
</script>

<style scoped>
.modal-wrapper {
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
.modal {
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
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.modal-title {
  margin: 0 auto;
}
.modal-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.modal-close {
  position: absolute;
  right: 1rem;
}
.modal-close:hover {
  cursor: pointer;
  color: maroon;
}
</style>
