export default class Flood {
  constructor() {
    this.name = "flood";
    this.description = "";
    this.active = false;
    this.countries = [];
    this.floods = [
      {
        description:
          "В результате сильнейшего цунами на восточном побережье Тихого океана сильно пострадали страны Центральной Америки (Гватемала, Сальвадор, Никарагуа, Коста Рика и Панама).",
        countries: ["GT", "SV", "NI", "CR", "PA"],
      },
      {
        description:
          "Сильнейшее цунами принесло колоссальные разрушения на прибрежные города Западной Африки (Сенегал, Гамбия, Гвинея-Бисау, Гвинея, Сьерра-Леоне, Либерия).",
        countries: ["SN", "GM", "GN", "GW", "SL", "LR"],
      },
      {
        description:
          "Сильное землятресение в Индийском океане вызвало разрушительное цунами. Ряд стран Юго-восточной Азии нуждаются в помощи (Шри-Ланка, Мьянма, Тайланд, Индонезия).",
        countries: ["LK", "MM", "TH", "ID"],
      },
    ];
  }

  activateEvent(relations, fillColor) {
    let flood = this.floods.sort(() => 0.5 - Math.random()).splice(0, 1)[0];
    this.description = flood.description;
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, flood.countries);
    } else {
      this.countries = flood.countries;
    }
    let relationCountries = relations.find(
      (relation) => relation.name == "emergency"
    ).countries;
    Array.prototype.push.apply(relationCountries, flood.countries);
    fillColor("#1434A4", flood.countries);
    if (this.floods.length == 0) {
      this.active = true;
    }
  }

  isActive() {
    return this.countries.length > 0;
  }
}
