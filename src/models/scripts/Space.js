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
  calculateCountryAtt(country) {
    let result =
      country.getInitScriptAtt(this.title) +
      country.attToRussia * this.spaceDaybonus();
    country.countryAgreements.forEach((agreement) => {
      switch (agreement) {
        case "space":
          result += 3;
          break;
        case "weaponse":
          result += 2;
          break;
      }
    });
    return result;
  }
}
