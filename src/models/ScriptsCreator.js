// import Bitcoin from "./scripts/Bitcoin";
// import Space from "./scripts/Space";
import * as ScriptModules from "./scripts";

export default class ScriptsCreator {
  constructor() {
    this.scripts = [];
  }

  // createScript(type) {
  //   let script;
  //   switch (type) {
  //     case "bitcoin":
  //       script = new ScriptModules.Bitcoin();
  //       break;
  //     case "space":
  //       script = new ScriptModules.Space();
  //       break;
  //   }
  //   return script;
  // }

  createAllScripts() {
    console.log(ScriptModules);
    Object.values(ScriptModules).forEach((Module) =>
      this.scripts.push(new Module())
    );
    return this.scripts;
  }
}
