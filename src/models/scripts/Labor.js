export default class Labor {
  constructor() {
    this.title = "labor";
    this.description = "";
    this.optionName = "Установить шести часовой рабочий день";
    this.active = true;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    return country.getInitScriptAtt(this.title) + country.attToRussia;
  }
}
