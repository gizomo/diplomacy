export default class Apposition {
  constructor() {
    this.name = "apposition";
    this.title = "Оказать поддержку оппозиционным силам";
    this.score = -3;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id) && country.inteligence;
  }
}
