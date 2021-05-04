export default class Borders {
  constructor() {
    this.name = "borders";
    this.title = "Заключить соглашение об открытых границах";
    this.score = 0;
  }

  isAvailable(country) {
    return country.attToRussia > 0 && country.attToRussia >= this.score;
  }
}
