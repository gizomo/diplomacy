export default class Agression {
  constructor() {
    this.name = "agression";
    this.title = "Угрожать применением вооруженной силы";
    this.statInfo = "Высказано угроз в отношении других стран";
    this.score = -5;
  }

  isAvailable(country) {
    return country.attToRussia <= this.score;
  }
}
