<template>
  <label class="checkbox" :class="{ checked: isChecked }" :for="value">
    <input
      type="checkbox"
      :id="value"
      :checked="isChecked"
      :value="value"
      @change="onChange"
    />
    <span :id="svgId"></span>
    {{ label }}
  </label>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    dataType: { type: String },
    label: { type: String, required: true },
    modelValue: { type: Array },
    value: { type: Number },
    optionObj: { type: Object },
  },
  data() {
    return {
      checkedOption: this.modelValue,

      svgId: `svg_${this.dataType}_${this.value}`,
      iconData: this.optionObj,
      svgContainer: null,
    };
  },
  computed: {
    isChecked() {
      return this.modelValue.includes(this.value);
    },
  },
  methods: {
    onChange() {
      if (event.target.checked) {
        this.checkedOption.push(this.value);
      } else {
        this.checkedOption.splice(this.checkedOption.indexOf(this.value), 1);
      }
      this.$emit("change", this.checkedOption);
    },
    generateIcon() {
      this.svgContainer = this.$svg(this.svgId)
        .size(50, 50)
        .viewbox(0, 0, 26.4, 26.4)
        .path(this.iconData.d)
        .fill("#7e7e7e");
    },
  },
  mounted() {
    this.generateIcon();
  },
};
</script>
<style scoped>
.checkbox {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(39, 39, 39);
  border-radius: 0.25rem;
  cursor: pointer;
}
.checkbox input {
  display: none;
}
.checked {
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(128, 128, 128, 0.5);
  background-color: darksalmon;
}
</style>
