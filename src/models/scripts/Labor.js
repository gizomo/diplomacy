export default class Labor {
  constructor() {
    this.title = "labor";
    this.description = "";
    this.optionName = "Установить шести часовой рабочий день";
    this.active = true;
    this.passed = false;
  }

  calculateCountryAtt(country, events) {
    let result = country.getInitScriptAtt(this.title) + country.attToRussia;
    country.countryRelations.forEach((relation) => {
      switch (relation) {
        case "apposition":
          result += 5;
          break;
        case "borders":
          result += 1;
          break;
      }
    });
    events
      .filter((event) => event.isActive())
      .forEach((fevent) => {
        switch (fevent.name) {
          case "working-day":
            if (fevent.countries.includes(country.id)) {
              result += 5;
            }
            break;
          case "economic-crysis":
            result -= 3;
            break;
        }
      });
    return result;
  }
}
