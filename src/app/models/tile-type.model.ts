import {TerrainType} from "../services/map-manager.service";

export class TileType {
  type: TerrainType;
  spawnPercent: number;
  adjacencyBonusPercentage: number;

  constructor(type: TerrainType, spawnPercent: number, adjacencyBonusPercentage: number) {
    this.type = type;
    this.spawnPercent = spawnPercent;
    this.adjacencyBonusPercentage = adjacencyBonusPercentage;
  }
}
