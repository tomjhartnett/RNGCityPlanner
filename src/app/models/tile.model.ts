import {TerrainType} from "../services/map-manager.service";
import {Building} from "./building.model";

export class Tile {
  type: TerrainType;
  building?: Building;

  get terrainImage(): string {
    let ret;
    switch(this.type) {
      case TerrainType.FertileLand: ret = "fertile_land"; break;
      case TerrainType.Water: ret = "water"; break;
      case TerrainType.NormalLand: ret = "normal_land"; break;
      case TerrainType.Hills: ret = "hills"; break;
      case TerrainType.Mountains: ret = "mountains"; break;
      default: ret = 'empty';
    }
    return ret;
  }

  get image(): string {
    return this.building ? this.building.image : this.terrainImage;
  }

  constructor(type: TerrainType) {
    this.type = type;
  }

}
