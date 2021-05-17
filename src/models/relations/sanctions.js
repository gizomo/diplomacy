export default class Sanctions {
  constructor() {
    this.name = "sanctions";
    this.title = "Ввести экономические санкции";
    this.statInfo = "Введено экономических санкций против других стран";
    this.score = -1;
  }

  isAvailable(country) {
    return country.attToRussia <= this.score;
  }
}
