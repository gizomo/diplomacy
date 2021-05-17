export default class Apposition {
  constructor() {
    this.name = "apposition";
    this.title = "Оказать поддержку оппозиционным силам";
    this.statInfo = "Оказана поддержка оппозиционным силам в других странах";
    this.score = -3;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id) && country.inteligence;
  }
}
