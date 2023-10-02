export class Building {
  name: string;
  _outputResources: {resource: string, amount: number}[];
  inputResources: {resource: string, amount: number}[];
  buildCost: {resource: string, amount: number}[];
  image: string;

  adjacencyBonus: number = 0;

  get outputResources(): {resource: string, amount: number}[] {
    return this._outputResources.map(r => ({resource: r.resource, amount: r.amount * this.adjacencyBonus}));
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
}
