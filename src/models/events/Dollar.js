import WorldMap from "../../assets/worldRussiaCrimeaLow.json";

export default class Dollar {
  constructor() {
    this.name = "dollar";
    this.description = "";
    this.suffix =
      " отказались использовать доллар США при заключении международных сделок.";
    this.active = false;
    this.countries = [];
    this.excludedCountries = ["RU", "US"];
  }

  activateEvent(relations) {
    const genCountries = this.getRandomCountries(this.getRandom(2, 5));
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, genCountries);
    } else {
      this.countries = genCountries;
    }
    relations.find(
      (relation) => relation.name == "money"
    ).countries = this.countries;
    const countriesNames = WorldMap.countries
      .filter((state) => genCountries.includes(state.id))
      .map((s) => {
        return s.title;
      })
      .join(", ");
    this.description = countriesNames + this.suffix;
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
