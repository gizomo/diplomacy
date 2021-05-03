export default class SpaceX {
  constructor() {
    this.name = "space-x";
    this.description =
      "Компания Space-X терпит колоссальные убытки. Ни один из ее коммерческих проектов не окупился. Частные инвесторы больше не хотят вкладыать деньги в космические программы.";
    this.active = false;
  }

  activateEvent() {
    this.active = true;
  }

  isActive() {
    return this.active;
  }
}
