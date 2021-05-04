export default class Virus {
  constructor() {
    this.name = "virus";
    this.description = "";
    this.active = false;
    this.countries = [];
    this.viruses = [
      {
        description:
          "В Западной Африке снова обнаружена вспышка опаносго вируса Эбола. Пока случаи заражения зафиксированны в Гане, Того, Бенине, Буркина Фасо и Нигерии.",
        countries: ["TG", "BJ", "GH", "BF", "NG"],
      },
      {
        description:
          "Эпидемия нового штама птичьего гриппа захлеснула страны Латинской Америки. Бразилия, Французская Гвиана, Суринам, Гайана, Венесуэла и Коллумбия просят оказать им гумманитарную помощь.",
        countries: ["BR", "GF", "SR", "GY", "VE", "CO"],
      },
    ];
  }

  activateEvent(relations, fillColor) {
    let virus = this.viruses.sort(() => 0.5 - Math.random()).slice(0, 1)[0];
    this.description = virus.description;
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, virus.countries);
    } else {
      this.countries = virus.countries;
    }
    let relationCountries = relations.find(
      (relation) => relation.name == "emergency"
    ).countries;
    Array.prototype.push.apply(relationCountries, virus.countries);
    fillColor("#DFFF00", virus.countries);
    if (this.viruses.length == 0) {
      this.active = true;
    }
  }

  isActive() {
    return this.countries.length > 0;
  }
}
