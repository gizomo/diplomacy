export default class Emergency {
  constructor() {
    this.name = "emergency";
    this.title =
      "Оказать помощь в ликвидации последствий техногенной/природной катастрофы";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
