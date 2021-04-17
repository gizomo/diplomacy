import WorldMap from "../../assets/worldRussiaCrimeaLow.json";

export default class WorkignDay {
  constructor() {
    this.name = "working-day";
    this.description =
      "В ряде стран правительства вводят под давлением общественности законы о сокращении рабочего дня до шести часов.";
    this.active = false;
    this.countries = [];
    this.excludedCountries = ["RU"];
  }

  activateEvent() {
    Array.prototype.push.apply(this.excludedCountries, this.countries);
    if (this.countries.length) {
      Array.prototype.push.apply(
        this.countries,
        this.getRandomCountries(this.getRandom(3, 10))
      );
    } else {
      this.countries = this.getRandomCountries(this.getRandom(3, 10));
    }
  }

  getRandomCountries(qty) {
    return WorldMap.countries
      .map((country) => {
        return country.id;
      })
      .filter((country) => !this.excludedCountries.includes(country))
      .sort(() => 0.5 - Math.random())
      .slice(0, qty);
  }

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
