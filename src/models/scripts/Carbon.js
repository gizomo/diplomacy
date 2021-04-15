export default class Carbon {
  constructor() {
    this.title = "carbon";
    this.description = "";
    this.optionName =
      "Запрет производства и потребления углеводородных видов топлива";
    this.active = true;
    this.passed = false;
    this.emission = 0;
    this.getCO2Emission();
  }

  calculateCountryAtt(country) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    if (this.emission > 0.3) {
      result += 3;
    }
    return result;
  }

  async getCO2Emission() {
    const today = new Date();
    let range = [today, today.setMonth(today.getMonth() - 1)].map((date) => {
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    });

    const f = await fetch(
      `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/average.json?begin=${range[1]}&end=${range[0]}&limit=31&offset=0`
    );
    const data = await f.json();
    let points = 0;
    data.forEach((point) => (points += point.average));
    this.emission = points / data.length;
    console.log(this.emission);
  }
}
