export default class Sanctions {
  constructor() {
    this.name = "sanctions";
    this.description =
      "Страны Европейского Союза отказались продлевать экономиеские санкции против России. Они снова высказывают интерес к сотрудничеству в высокотехнологичных отраслях экономики.";
    this.active = false;
  }

  activateEvent() {
    this.active = true;
  }
}
