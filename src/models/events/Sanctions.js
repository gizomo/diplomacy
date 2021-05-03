export default class Sanctions {
  constructor() {
    this.name = "sanctions";
    this.description =
      "Европейский Союз отказался продлевать экономиеские санкции против России. Большинство европейских стран снова проявляют интерес к сотрудничеству в высокотехнологичных отраслях экономики.";
    this.active = false;
    this.countries = ["AT", "BE", "DE", "FI", "FR", "IT", "SE"];
  }

  activateEvent() {
    this.active = true;
  }

  isActive() {
    return this.active;
  }
}
