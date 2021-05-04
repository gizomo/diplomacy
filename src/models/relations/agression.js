export default class Agression {
  constructor() {
    this.name = "agression";
    this.title = "Угрожать применением вооруженной силы";
    this.score = -5;
  }

  isAvailable(country) {
    return country.attToRussia <= this.score;
  }
}
