export default class Opec {
  constructor() {
    this.name = "opec";
    this.description =
      "Страны ОПЕК отказываются удерживать квоты на добычу углеводородов. Цены на мировом рынке нефти и природного газа снова бьют исторический минимум.";
    this.active = false;
    this.countries = [
      "AE",
      "AO",
      "AZ",
      "BR",
      "CA",
      "CG",
      "CO",
      "DZ",
      "GA",
      "GQ",
      "ID",
      "IQ",
      "IR",
      "KW",
      "LY",
      "MX",
      "NG",
      "NO",
      "OM",
      "QA",
      "RU",
      "SA",
      "VE",
      "US",
    ];
  }

  activateEvent() {
    this.active = true;
  }

  isActive() {
    return this.active;
  }
}
