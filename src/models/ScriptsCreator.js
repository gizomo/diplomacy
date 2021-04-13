import Bitcoin from "./scripts/Bitcoin";
import Space from "./scripts/Space";

export default class ScriptsCreator {
  createScript(type) {
    let script;
    switch (type) {
      case "bitcoin":
        script = new Bitcoin();
        break;
      case "space":
        script = new Space();
        break;
    }
    return script;
  }
}
