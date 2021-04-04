<template>
  <label class="checkbox" :class="{ checked: isChecked }" :for="value">
    <input
      type="checkbox"
      :id="value"
      :checked="isChecked"
      :value="value"
      @change="onChange"
    />
    <span class="svgicon" :id="svgId"></span>
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
    onChange(event) {
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
        .fill("#fafcff");
    },
  },
  mounted() {
    this.generateIcon();
  },
};
</script>
<style scoped>
.checkbox {
  width: calc((100% / 3) + 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  color: #fafcff;
  background-color: #0266f2;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.checkbox:hover {
  transition: all 0.3s ease-in-out;
  opacity: 0.7;
  transform: translate3d(0, 0, 0);
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(2, 100, 242, 0.2);
}
.checkbox input {
  display: none;
}
.checked {
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(2, 100, 242, 0.2);
  background: linear-gradient(180deg, #00efd1 1%, #00acea 99%);
}
.svgicon {
  margin-right: 1rem;
}
</style>
