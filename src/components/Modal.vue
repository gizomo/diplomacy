<template>
  <div class="modal-wrapper" ref="modal_wrapper">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          <slot name="header">
            <h2>{{ modalContent.title }}</h2>
          </slot>
        </div>
        <span class="modal-close" @click="closeModal">
          <i class="material-icons">close</i>
        </span>
      </div>
      <div class="modal-content">
        <slot name="content">
          <div v-html="modalContent.body"></div>
        </slot>
      </div>
      <div class="modal-footer">
        <div class="buttons">
          <slot name="footer">
            <button class="modal-footer-button" @click="closeModal">
              {{ modalContent.button }}
            </button>
          </slot>
        </div>
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
          body: "",
          button: "Закрыть",
        };
      },
    },
  },
  methods: {
    closeModal() {
      // document.body.style.overflow = null;
      this.$emit("closeModal");
    },
  },
  mounted() {
    const vm = this;
    // document.body.style.overflow = "hidden";
    document.addEventListener("click", function (event) {
      if (event.target === vm.$refs["modal_wrapper"]) {
        vm.closeModal();
      }
    });

    document.addEventListener("keyup", function (event) {
      if (event.key === "Escape") {
        vm.closeModal();
      }
    });
  },
};
</script>

<style scoped>
.flag {
  display: block;
  width: 9rem;
  margin: 0 auto;
}
.modal-wrapper {
  min-height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.4);
  z-index: 199;
}
.modal {
  position: sticky;
  top: 2rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  width: 50vw;
  background-color: #fafcff;
  border-radius: 1.5rem;
  box-shadow: 0px 25px 20px rgba(2, 100, 242, 0.2);
  z-index: 200;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.modal-title {
  margin: 0 auto;
}
.modal-content {
  padding: 1rem 2rem;
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
