export default class Carbon {
  constructor() {
    this.title = "carbon";
    this.description = "";
    this.optionName =
      "Запрет производства и потребления углеводородных видов топлива";
    this.type = "anti";
    this.active = false;
    this.passed = false;
    this.emission = 0;
    this.getCO2Emission();
  }

  calculateCountryAtt(country, events) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    if (this.emission > 0.04) {
      result += 3;
    }
    country.countryRelations.forEach((relation) => {
      switch (relation) {
        case "atom":
          result -= 2;
          break;
        case "emergency":
          result -= 5;
          break;
      }
    });
    events
      .filter((event) => event.isActive())
      .forEach((fevent) => {
        switch (fevent.name) {
          case "oil-spill":
            result += 3;
            break;
          case "opec":
            if (!fevent.countries.includes(country.id)) {
              result -= 5;
            }
            break;
          case "cars":
            result += 2;
            break;
        }
      });
    return result;
  }

  async getCO2Emission() {
    let today = new Date();
    let range = [
      new Date(),
      new Date(today.setMonth(today.getMonth() - 1)),
    ].map((date) => {
      return (
        date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    });

    const f = await fetch(
      `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?country=RU&begin=${range[1]}&end=${range[0]}&limit=31&offset=0`
    );
    const data = await f.json();
    let points = 0;
    data.forEach((point) => (points += point.average));
    this.emission = points / data.length;
  }
}
