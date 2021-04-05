<template>
  <span class="svgicon" :id="svgId"></span>
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
  mounted() {
    this.$svg(this.svgId)
      .size(this.size[0], this.size[1])
      .viewbox(this.viewbox)
      .path(this.path)
      .fill(this.fill);
  },
};
</script>
