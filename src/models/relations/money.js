export default class Modey {
  constructor() {
    this.name = "money";
    this.title =
      "Заключить соглашение о ведении торговли в национальных валютах";
    this.statInfo = "Ведется торговля в национальной валюте с другими странами";
    this.score = 1;
    this.countries = [];
  }

  isAvailable(country) {
    return (
      (country.attToRussia > 0 && country.attToRussia >= this.score) ||
      this.countries.includes(country.id)
    );
  }
}
