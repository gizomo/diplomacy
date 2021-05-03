import * as ScriptModules from "./scripts";

export default class ScriptsCreator {
  constructor() {
    this.scripts = [];
  }

  createScript(type) {
    return new ScriptModules[type]();
  }

  createAllScripts() {
    Object.values(ScriptModules).forEach((Module) =>
      this.scripts.push(new Module())
    );
    return this.scripts;
  }
}
