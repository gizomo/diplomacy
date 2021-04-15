export default class Country {
  constructor(countryData) {
    this.title = countryData.title;
    this.description = "";
    // this.attToRussia = countryData.attToRussia;
    this.attToRussia = this.getRandom(10);
    // this.initScriptsAtt = countryData.initScriptsAtt;
    this.initScriptsAtt = [
      { name: "bitcoin", value: this.getRandom(10) },
      { name: "space", value: this.getRandom(10) },
      { name: "nuclear", value: this.getRandom(10) },
      { name: "carbon", value: this.getRandom(10) },
      { name: "labor", value: this.getRandom(10) },
    ];
    this.actualScriptsAtt = [];
  }
  getRandom(max) {
    return Math.floor(Math.random() * max * 2) - max;
  }
  getInitScriptAtt(scriptName) {
    const attitude = this.initScriptsAtt.find(
      (attitude) => attitude.name === scriptName
    );
    return attitude.value;
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
