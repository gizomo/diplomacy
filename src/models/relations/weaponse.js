export default class Weaponse {
  constructor() {
    this.name = "weaponse";
    this.title = "Заключить соглашение о поставках вооружений";
    this.score = 9;
    this.countries = [
      "AO",
      "AM",
      "BD",
      "BY",
      "CF",
      "CN",
      "DZ",
      "EG",
      "ET",
      "GR",
      "IN",
      "ID",
      "IQ",
      "IR",
      "JO",
      "KZ",
      "KG",
      "LA",
      "ML",
      "MN",
      "MZ",
      "MM",
      "NE",
      "PK",
      "PH",
      "QA",
      "SA",
      "RS",
      "SY",
      "TJ",
      "TR",
      "ZA",
      "UZ",
      "VN",
    ];
  }

  isAvailable(country) {
    return this.countries.includes(country.id);
  }
}
