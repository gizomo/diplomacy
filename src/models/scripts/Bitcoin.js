export default class Bitcoin {
  constructor() {
    this.title = "bitcoin";
    this.description = "";
    this.optionName =
      "Принять Bitcoin в качестве международной резервной валюты";
    this.active = false;
  }
  calculateCountryAtt(country) {
    return country.getInitScriptAtt(this.title) + country.attToRussia;
  }
}
