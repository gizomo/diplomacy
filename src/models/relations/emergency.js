export default class Emergency {
  constructor() {
    this.name = "emergency";
    this.title =
      "Оказать помощь в ликвидации последствий техногенной/природной катастрофы";
    this.statInfo =
      "Оказана помощь другим странам в ликвидации последствий катастроф";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
