export default class OilSpill {
  constructor() {
    this.name = "oil-spill";
    this.description =
      "У побережья Норвегии произошла авария на нефтяной платформе компании Статоил. Теплое Норвежское океаническое течение быстро разносит миллионы галонов сырой нефти вдоль всего северного побережья Европы.";
    this.active = false;
    this.countries = ["NO", "SE", "DE", "DK", "NL", "BE", "FR", "GB"];
  }

  activateEvent(relations, fillColor) {
    let relationCountries = relations.find(
      (relation) => relation.name == "emergency"
    ).countries;
    Array.prototype.push.apply(relationCountries, this.countries);
    fillColor("#301934", this.countries);
    this.active = true;
  }

  isActive() {
    return this.active;
  }
}
