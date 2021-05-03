import WorldMap from "../../assets/worldRussiaCrimeaLow.json";

export default class Dollar {
  constructor() {
    this.name = "dollar";
    this.description =
      "Ряд стран отказалось использовать доллар США при заключении междуанродных сделок.";
    this.active = false;
    this.countries = [];
    this.excludedCountries = ["RU", "US"];
  }

  activateEvent() {
    if (this.countries.length) {
      Array.prototype.push.apply(
        this.countries,
        this.getRandomCountries(this.getRandom(3, 10))
      );
    } else {
      this.countries = this.getRandomCountries(this.getRandom(3, 10));
    }
  }

  isActive() {
    return this.countries.length > 0;
  }

  getRandomCountries(qty) {
    return WorldMap.countries
      .map((country) => {
        return country.id;
      })
      .filter(
        (country) =>
          !this.countries.includes(country) &&
          !this.excludedCountries.includes(country)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, qty);
  }

  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
