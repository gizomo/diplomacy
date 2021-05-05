export default class Nuclear {
  constructor() {
    this.title = "nuclear";
    this.description = "";
    this.optionName = "Всеобъемлющий запрет ядерного оружия";
    this.type = "player";
    this.active = false;
    this.passed = false;
    this.nuclearStates = ["CN", "FR", "GB", "US"];
  }

  calculateCountryAtt(country) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    if (this.nuclearStates.includes(country.id)) {
      return 10;
    } else {
      country.countryRelations.forEach((relation) => {
        switch (relation) {
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
