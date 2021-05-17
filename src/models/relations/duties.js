export default class Duties {
  constructor() {
    this.name = "duties";
    this.title = "Заключить соглашене о взаимном снижении торговых пошлин";
    this.statInfo = "Снижены торговые пошлины в отношении других стран";
    this.score = 3;
  }

  isAvailable(country) {
    return country.attToRussia > 0 && country.attToRussia >= this.score;
  }
}
