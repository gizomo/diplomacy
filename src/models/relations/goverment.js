export default class Goverment {
  constructor() {
    this.name = "goverment";
    this.title = "Выступить в поддержку официальных властей";
    this.statInfo = "Поддержано официальных властей других стран";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
