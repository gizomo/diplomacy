export default class Goverment {
  constructor() {
    this.name = "goverment";
    this.title = "Выступить в поддрежку официальных властей";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
