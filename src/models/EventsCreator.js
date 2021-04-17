// import Bitcoin from "./scripts/Bitcoin";
// import Space from "./scripts/Space";
import * as EventModules from "./events";

export default class EventsCreator {
  constructor() {
    this.events = [];
  }

  createEvent(type) {
    return new EventModules[type]();
  }

  createAllEvents() {
    Object.values(EventModules).forEach((Module) =>
      this.events.push(new Module())
    );
    return this.events;
  }
}
