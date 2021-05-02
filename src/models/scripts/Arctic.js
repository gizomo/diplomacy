export default class Arctic {
  constructor() {
    this.title = "arctic";
    this.description = "";
    this.optionName =
      "Закрепить международной статус внешельфовой зоны в Арктике";
    this.active = false;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    country.countryAgreements.forEach((agreement) => {
      switch (agreement) {
        case "apposition":
          result += 5;
          break;
        case "goverment":
          result -= 1;
          break;
        case "borders":
          result -= 2;
          break;
      }
    });
    return result;
  }
}
