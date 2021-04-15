export default class Nuclear {
  constructor() {
    this.title = "nuclear";
    this.description = "";
    this.optionName = "Всеобъемлющий запрет ядерного оружия";
    this.active = true;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    return country.getInitScriptAtt(this.title) + country.attToRussia;
  }
}
