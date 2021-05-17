export default class Space {
  constructor() {
    this.name = "space";
    this.title =
      "Заключить соглашение о сотрудничестве в области освоения космоса";
    this.statInfo = "Сотруденичество в космической области с другими странами";
    this.score = 7;
    this.countries = [
      "AM",
      "AR",
      "BR",
      "BY",
      "DE",
      "ES",
      "FR",
      "GF",
      "ID",
      "KZ",
      "MY",
      "NI",
      "TR",
      "US",
      "VE",
      "ZA",
    ];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
