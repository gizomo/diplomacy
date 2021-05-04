export default class Conflict {
  constructor() {
    this.name = "conflict";
    this.description = "";
    this.active = false;
    this.countries = [];
    this.conflicts = [
      {
        description:
          "Вооруженный конфликт в Сирии расширяется на соседние страны (Ирак, Ливан и Иордан). Террористические группировки начинают переносить свои базы в эти страны.",
        countries: ["IQ", "JO", "LB"],
      },
      {
        description:
          "Террористические оргназиации Аль-Каида и Аль-Мурабитун проявляют новую активность в Западной Африке. Население западной части Нигера, Буркина—Фасо, Кот—д'Ивуара и Мали подвергается постоянным нападениям террористов.",
        countries: ["NE", "BF", "CI", "ML"],
      },
      {
        description:
          "Из-за нового военного переворота в Южном Судане в стране снова вспыхнула гражданская война. Воспользовавшись моментом Судан ввел свои войска на спорные территории. Также из-за конфликта обострилась ситуация на границе с Чадом.",
        countries: ["SD", "SS", "TD"],
      },
      {
        description:
          "Узбекистан, Таджикистан и Киргизия снова на грани вооруженного конфликта из-за многочисленных территориальных и пограничных споров.",
        countries: ["UZ", "TJ", "KG"],
      },
    ];
  }

  activateEvent(relations, fillColor) {
    let conflict = this.conflicts
      .sort(() => 0.5 - Math.random())
      .splice(0, 1)[0];
    this.description = conflict.description;
    if (this.countries.length) {
      Array.prototype.push.apply(this.countries, conflict.countries);
    } else {
      this.countries = conflict.countries;
    }
    let relationCountries = relations.find(
      (relation) => relation.name == "military"
    ).countries;
    Array.prototype.push.apply(relationCountries, conflict.countries);
    fillColor("#D2042D", conflict.countries);
    if (this.conflicts.length == 0) {
      this.active = true;
    }
  }

  isActive() {
    return this.countries.length > 0;
  }
}
