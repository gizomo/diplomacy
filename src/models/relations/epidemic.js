export default class Epidemic {
  constructor() {
    this.name = "epidemic";
    this.title = "Оказать помощь в борьбе с эпидемией";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
