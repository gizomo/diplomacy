export default class Atom {
  constructor() {
    this.name = "atom";
    this.title = "Заключить соглашение о строительстве АЭС";
    this.statInfo = "Строится АЭС в других странах";
    this.score = 5;
    this.countries = [
      "AE",
      "AM",
      "BD",
      "BE",
      "BG",
      "CN",
      "CZ",
      "EG",
      "FI",
      "IN",
      "IR",
      "JO",
      "HU",
      "KW",
      "OM",
      "QA",
      "SA",
      "SK",
      "TR",
      "UZ",
      "VE",
    ];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
