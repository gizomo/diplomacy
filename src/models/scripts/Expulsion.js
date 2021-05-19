export default class Expulsion {
  constructor() {
    this.title = "expulsion";
    this.description = "";
    this.optionName =
      "Исключить Российскую Федерацию из состава постоянных членов Совета безопасности ООН";
    this.type = "anti";
    this.active = false;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    let result = country.attToRussia;
    country.countryRelations.forEach((relation) => {
      switch (relation) {
        case "apposition":
          result += 10;
          break;
        case "sanctions":
          result += 15;
          break;
        case "agression":
          result += 20;
          break;
      }
    });
    return result;
  }
}
