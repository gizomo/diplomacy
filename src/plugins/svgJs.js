import svgJs from "svg.js/dist/svg";

export default {
  install: (app) => {
    app.config.globalProperties.$svg = svgJs;
  },
};
