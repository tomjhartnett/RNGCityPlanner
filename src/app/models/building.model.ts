export class Building {
  name: string;
  _outputResources: {resource: string, amount: number}[];
  inputResources: {resource: string, amount: number}[];
  buildCost: {resource: string, amount: number}[];
  image: string;

  adjacencyBonus: number = 1;

  get outputResources(): {resource: string, amount: number}[] {
    return this._outputResources.map(r => ({resource: r.resource, amount: r.amount * this.adjacencyBonus}));
  }

  get outputResourcesFormatted(): string {
    return this.formatResources(this.outputResources);
  }

  get inputResourcesFormatted(): string {
    return this.formatResources(this.inputResources);
  }

  get buildCostFormatted(): string {
    return this.formatResources(this.buildCost);
  }

  constructor(name: string, outputResources: {resource: string, amount: number}[], inputResources: {resource: string, amount: number}[], buildCost: {resource: string, amount: number}[], image: string) {
    this.name = name;
    this._outputResources = outputResources;
    this.inputResources = inputResources;
    this.buildCost = buildCost;
    this.image = image;
  }

  setAdjacencyBonus(bonus: number) {
    this.adjacencyBonus = bonus;
  }

  formatResources(resources: {resource: string, amount: number}[]): string {
    let ret = '';
    let first = true;
    resources.forEach(r => {
      if(!first) {
        ret += ', ';
      }
      first = false;
      ret += `${r.resource}: ${r.amount}`;
    });
    return ret;
  }
}
