import { createApp } from "vue";
import Root from "./App.vue";
import svgJs from "./plugins/svgJs";
import tooltip from "./plugins/tooltip";
import panZoom from "vue-panzoom";
import VueNotificationList from "@dafcoe/vue-notification";

import "material-design-icons-iconfont";
import "./plugins/tooltip.css";

const app = createApp(Root);
app.directive("tooltip", tooltip);
app.use(svgJs);
app.use(panZoom);
app.use(VueNotificationList);
app.mount("#app");
