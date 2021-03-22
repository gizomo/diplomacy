import { createApp } from "vue";
import Root from "./App.vue";
import svgJs from "./plugins/svgJs";

const app = createApp(Root);
app.use(svgJs);
app.mount("#app");
