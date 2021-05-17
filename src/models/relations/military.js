export default class Military {
  constructor() {
    this.name = "military";
    this.title = "Оказать военную помощь";
    this.statInfo = "Оказана военная помощь другим странам";
    this.score = 0;
    this.countries = [];
  }

  isAvailable(country) {
    return (
      country.attToRussia >= this.score && this.countries.includes(country.id)
    );
  }
}
