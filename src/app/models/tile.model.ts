import {TerrainType} from "../services/map-manager.service";

export class Tile {
  type: TerrainType;

  constructor(type: TerrainType) {
    this.type = type;
  }

}
