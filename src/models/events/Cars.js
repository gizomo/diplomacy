export default class Cars {
  constructor() {
    this.name = "cars";
    this.description =
      "Крупнейшие мировые автоконцерны объявили о конце эры автомобилей с двигателями внутреннего сгорания. С этого года они начнут массовый выпуск электрокаров.";
    this.active = false;
  }

  activateEvent() {
    this.active = true;
  }
}
