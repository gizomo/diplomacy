export default class Earthquake {
  constructor() {
    this.name = "earthquake";
    this.description = "";
    this.active = false;
    this.countries = [];
    this.earthquakes = [
      {
        description:
          "Землятресение в 9 баллов стало причиной крупных разрушений в ряде Японских городов",
        countries: ["JP"],
      },
      {
        description:
          "Несколько городов и мелких поселений Киргизии и Таджикистана пострадали в результате серии землятресений.",
        countries: ["KG", "TJ"],
      },
      {
        description:
          "Сильное землятресение на Балканах стало разрушительным для ряда городов Черногории, Албании, Косово и Сербии",
        countries: ["XK", "RS", "ME", "AL"],
      },
      {
        description:
          "Землятресение на границе Лаоса, Камбоджи и Вьетнама стало причиной сильных разрушений.",
        countries: ["LA", "KH", "VN"],
      },
    ];
  }

  activateEvent(relations, fillColor) {
    let earthquake = this.earthquakes
      .sort(() => 0.5 - Math.random())
      .splice(0, 1)[0];
    this.description = earthquake.description;
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, earthquake.countries);
    } else {
      this.countries = earthquake.countries;
    }
    let relationCountries = relations.find(
      (relation) => relation.name == "emergency"
    ).countries;
    Array.prototype.push.apply(relationCountries, earthquake.countries);
    fillColor("#800020", earthquake.countries);
    if (this.earthquakes.length == 0) {
      this.active = true;
    }
  }

  isActive() {
    return this.countries.length > 0;
  }
}
