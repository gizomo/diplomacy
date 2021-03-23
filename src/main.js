import { createApp } from "vue";
import Root from "./App.vue";
import svgJs from "./plugins/svgJs";
import "material-design-icons-iconfont";

const app = createApp(Root);
app.use(svgJs);
app.mount("#app");
