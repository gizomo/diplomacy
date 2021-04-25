export default class Labor {
  constructor() {
    this.title = "labor";
    this.description = "";
    this.optionName = "Установить шести часовой рабочий день";
    this.active = true;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    country.countryAgreements.forEach((agreement) => {
      switch (agreement) {
        case "apposition":
          result += 5;
          break;
        case "borders":
          result += 1;
          break;
      }
    });
    return result;
  }
}
