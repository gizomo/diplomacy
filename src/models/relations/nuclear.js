export default class Nuclear {
  constructor() {
    this.name = "nuclear";
    this.title = "Заключить соглашение о взаимном сокращении ядерного оружия";
    this.statInfo = "Заключено соглашений с ядерными государствами";
    this.score = 0;
    this.countries = ["CN", "FR", "GB", "US"];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
