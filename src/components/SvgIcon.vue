<template>
  <span class="svgicon" :id="svgId" @click="tooltip"></span>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    svgId: String,
    size: Array,
    viewbox: Array,
    path: String,
    fill: String,
  },
  methods: {
    tooltip() {
      this.$emit("tooltip");
    },
  },
  mounted() {
    this.$svg(this.svgId)
      .size(this.size[0], this.size[1])
      .viewbox(this.viewbox)
      .path(this.path)
      .fill(this.fill);
  },
};
</script>
<style scoped>
.svgicon {
  display: inline-block;
}
.svgicon:hover {
  stroke: #fff;
  opacity: 0.7;
}
</style>
