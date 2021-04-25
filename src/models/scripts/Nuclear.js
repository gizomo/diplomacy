export default class Nuclear {
  constructor() {
    this.title = "nuclear";
    this.description = "";
    this.optionName = "Всеобъемлющий запрет ядерного оружия";
    this.active = false;
    this.passed = false;
  }

  calculateCountryAtt(country) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    if (["CN", "FR", "GB", "US"].includes(country.id)) {
      return 10;
    } else {
      country.countryAgreements.forEach((agreement) => {
        switch (agreement) {
          case "atom":
            result += 5;
            break;
          case "weaponse":
            result += 2;
            break;
          case "agression":
            result -= 5;
            break;
        }
      });
    }
    return result;
  }
}
