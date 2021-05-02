export default class Bitcoin {
  constructor() {
    this.title = "bitcoin";
    this.description = "";
    this.optionName =
      "Принять Bitcoin в качестве международной резервной валюты";
    this.active = true;
    this.passed = false;
    this.btcPrice = 0;
    this.getTicker();
  }

  calculateCountryAtt(country, events) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    if (this.btcPrice > 50000) {
      result += 5;
    }
    country.countryAgreements.forEach((agreement) => {
      switch (agreement) {
        case "money":
          result += 2;
          break;
        case "duties":
          result += 2;
          break;
        case "sanctions":
          result -= 5;
          break;
      }
    });
    events
      .filter(
        (event) =>
          event.active ||
          ("countries" in event ? event.countries.length > 0 : false)
      )
      .forEach((fevent) => {
        switch (fevent.name) {
          case "dollar":
            if (fevent.countries.includes(country.id)) {
              result += 2;
            }
            break;
          case "economic-crysis":
            result += 2;
            break;
        }
      });
    return result;
  }

  async getTicker() {
    const f = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`
    );
    const data = await f.json();
    this.btcPrice =
      data.USD > 1 ? data.USD.toFixed(2) : data.USD.toPrecision(2);
  }
}
