import WorldMap from "../../assets/worldRussiaCrimeaLow.json";

export default class PoliticalCrysis {
  constructor() {
    this.name = "political-crysis";
    this.description = "";
    this.suffix =
      " объявили о чрезвычайном положении в связи с политическим кризисом. Оппозиционные силы в этих странах переходят к активному сопротивлению.";
    this.active = false;
    this.countries = [];
    this.excludedCountries = ["RU"];
  }

  activateEvent(relations) {
    const genCountries = this.getRandomCountries(this.getRandom(2, 3));
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, genCountries);
    } else {
      this.countries = genCountries;
    }
    relations.forEach((relation) => {
      if (relation.name == "apposition" || relation.name == "goverment") {
        relation.countries = this.countries;
      }
    });
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
