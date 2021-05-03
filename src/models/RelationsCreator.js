import * as RelationsModules from "./relations";

export default class RelationsCreator {
  constructor() {
    this.relations = [];
  }

  createRelation(type) {
    return new RelationsModules[type]();
  }

  createAllRelations() {
    Object.values(RelationsModules).forEach((Module) =>
      this.relations.push(new Module())
    );
    return this.relations;
  }
}
