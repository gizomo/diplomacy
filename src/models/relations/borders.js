export default class Borders {
  constructor() {
    this.name = "borders";
    this.title = "Заключить соглашение об открытых границах";
    this.statInfo = "Установлен режим открытых границ с другими странами";
    this.score = 0;
  }

  isAvailable(country) {
    return country.attToRussia > 0 && country.attToRussia >= this.score;
  }
}
