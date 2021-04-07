<template>
  <label class="checkbox" :class="{ checked: isChecked }" :for="value">
    <input
      type="checkbox"
      :id="checkBoxObject.id"
      :checked="isChecked"
      @change="onChange"
    />
    <svg-icon
      :svgId="dataType + '_icon_' + checkBoxObject.id"
      :size="[50, 50]"
      :viewbox="[0, 0, 26.4, 26.4]"
      :path="checkBoxObject.d"
      :fill="'#fafcff'"
    />
    {{ checkBoxObject.name }}
    <span class="checkbox-info" @click.prevent="openInfo">
      <i class="material-icons">info</i>
    </span>
  </label>
</template>
<script>
import SvgIcon from "./SvgIcon";

export default {
  name: "CheckBox",
  components: {
    SvgIcon,
  },
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    dataType: { type: String },
    modelValue: { type: Array },
    value: { type: Number },
    checkBoxObject: { type: Object },
  },
  data() {
    return {
      checkedOption: this.modelValue,
      svgId: `svg_${this.dataType}_${this.value}`,
    };
  },
  computed: {
    isChecked() {
      return this.modelValue.includes(this.value);
    },
  },
  methods: {
    openInfo() {
      this.$emit("openInfo", this.checkBoxObject);
    },
    onChange(event) {
      if (event.target.checked) {
        this.checkedOption.push(this.value);
      } else {
        this.checkedOption.splice(this.checkedOption.indexOf(this.value), 1);
      }
      this.$emit("change", this.checkedOption);
    },
  },
};
</script>
<style scoped>
.checkbox {
  position: relative;
  width: calc((100% / 3) + 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  color: #fafcff;
  background-color: #0266f2;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.checkbox:hover {
  transition: all 0.3s ease-in-out;
  filter: brightness(120%);
  box-shadow: 0.1rem 0.1rem 0.2rem 0.1rem rgb(2, 100, 242, 0.2);
}
.checkbox-info {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  transition-delay: 0.5s;
}
.checkbox:hover .checkbox-info {
  opacity: 1;
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
