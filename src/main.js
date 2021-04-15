import { createApp } from "vue";
import Root from "./App.vue";
import svgJs from "./plugins/svgJs";
import panZoom from "vue-panzoom";
import "material-design-icons-iconfont";

const app = createApp(Root);
app.use(svgJs);
app.use(panZoom);
app.mount("#app");
