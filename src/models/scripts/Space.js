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
    return isToday ? 5 : 0;
  }
  calculateCountryAtt(country) {
    return (
      country.getInitScriptAtt(this.title) +
      country.attToRussia +
      this.spaceDaybonus()
    );
  }
}
