export default class Opec {
  constructor() {
    this.name = "opec";
    this.description =
      "Страны ОПЕК отказываются удерживать квоты на добычу углеводородов. Цены на мировом рынке нефти и природного газа снова бьют истоический минимум.";
    this.active = false;
  }

  activateEvent() {
    this.active = true;
  }
}
