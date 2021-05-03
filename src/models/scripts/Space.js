export default class Space {
  constructor() {
    this.title = "space";
    this.description = "";
    this.optionName = "Запрет на конкуренцию в космосе";
    this.active = true;
    this.passed = false;
  }
  spaceDaybonus() {
    const spaceDay = new Date(1961, 3, 12);
    const isToday = () => {
      const today = new Date();
      return (
        spaceDay.getDate() == today.getDate() &&
        spaceDay.getMonth() == today.getMonth()
      );
    };
    return isToday ? 2 : 1;
  }
  calculateCountryAtt(country, events) {
    let result =
      country.getInitScriptAtt(this.title) +
      country.attToRussia * this.spaceDaybonus();
    country.countryRelations.forEach((relation) => {
      switch (relation) {
        case "space":
          result += 3;
          break;
        case "weaponse":
          result += 2;
          break;
      }
    });
    events
      .filter((event) => event.isActive())
      .forEach((fevent) => {
        switch (fevent.name) {
          case "sanctions":
            if (fevent.countries.includes(country.id)) {
              result += 5;
            }
            break;
          case "space-x":
            result += 3;
            break;
        }
      });
    return result;
  }
}
