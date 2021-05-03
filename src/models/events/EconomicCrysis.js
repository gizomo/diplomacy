export default class EconomicCrysis {
  constructor() {
    this.name = "economic-crysis";
    this.description =
      "Мир снова охватил экономический кризис. Мировая валютная система в упадке. Доллар США и Евро резко падают в цене.";
    this.active = false;
  }

  activateEvent() {
    this.active = true;
  }

  isActive() {
    return this.active;
  }
}
