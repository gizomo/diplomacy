export default class Country {
  constructor(countryData, scripts) {
    this.id = countryData.id;
    this.title = countryData.title;
    this.description = "";
    this.attToRussia = countryData.atr;
    this.initScriptsAtt = this.initScripts(scripts);
    // this.initScriptsAtt = [
    //   { name: "bitcoin", value: this.getRandom(10) },
    //   { name: "space", value: this.getRandom(10) },
    //   { name: "nuclear", value: this.getRandom(10) },
    //   { name: "carbon", value: this.getRandom(10) },
    //   { name: "labor", value: this.getRandom(10) },
    // ];
    this.actualScriptsAtt = [];
    this.countryRelations = [];
    this.inteligence = false;
  }
  getRandom(max) {
    return Math.floor(Math.random() * max * 2) - max;
  }
  initScripts(scripts) {
    return scripts.map((script) => {
      return {
        name: script.title,
        title: script.optionName,
        value: this.getRandom(10),
      };
    });
  }
  getInitScriptAtt(scriptName) {
    const attitude = this.initScriptsAtt.find(
      (attitude) => attitude.name === scriptName
    );
    return attitude.value;
  }
  hasRelation(relation) {
    return this.countryRelations.includes(relation);
  }
  addRelation(relation) {
    this.countryRelations.push(relation.name);
    if (relation.score >= 0) {
      this.attToRussia++;
    }
    if (relation.score < 0) {
      this.attToRussia--;
    }
  }
  plantSpy() {
    this.inteligence = true;
  }
  setActualScriptAtt(scriptName, scriptValue) {
    const attIndex = this.actualScriptsAtt.findIndex(
      (attitude) => attitude.name === scriptName
    );
    if (attIndex < 0) {
      this.actualScriptsAtt.push({ name: scriptName, value: scriptValue });
    } else {
      this.actualScriptsAtt.splice(attIndex, 1, {
        name: scriptName,
        value: scriptValue,
      });
    }
  }
}
