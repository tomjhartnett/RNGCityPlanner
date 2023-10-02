import { Injectable } from '@angular/core';
import {Tile} from "../models/tile.model";
import {TileType} from "../models/tile-type.model";

export enum TerrainType {
  Water,
  FertileLand,
  NormalLand,
  Hills,
  Mountains,
}

// Define tile types using the TileType class
export const tileTypes: TileType[] = [
  new TileType(TerrainType.Water, 10, 150),
  new TileType(TerrainType.FertileLand, 30, 100),
  new TileType(TerrainType.NormalLand, 20, 100),
  new TileType(TerrainType.Hills, 15, 100),
  new TileType(TerrainType.Mountains, 15, 100),
];

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  _map: Map<{x: number, y: number}, Tile> = new Map<{x: number; y: number}, Tile>();

  get map() {
    return this._map;
  }

  constructor() {
    this._map = this.generateMap(3, 3, true);
    this._map.get = function(key: {x: number, y: number}): Tile | undefined {
      for(let [k, value] of this.entries()) {
        if(key.x == k.x && key.y == k.y) {
          return value;
        }
      }
      return undefined;
    }
  }

  generateMap(maxX: number, maxY: number, isStarterMap = false): Map<{x: number, y: number}, Tile> {
    let retMap: Map<{x: number, y: number}, Tile> = new Map<{x: number; y: number}, Tile>();
    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        retMap.set(
          {x, y},
          this.generateTile(
            this.getAdjacentCells(x, y)
              .map(coords => {
                return retMap.get({x: coords.x, y: coords.y}) ? this.map.get({x: coords.x, y: coords.y}) : undefined;
              }),
            isStarterMap)
          );
      }
    }
    return retMap;
  }

  getAdjacentCells(xCoord: number, yCoord: number): { x: number, y: number }[] {
    let coords = [];
    for(let y = yCoord - 1; y <= yCoord + 1; y++) {
      for(let x = xCoord - 1; x <= xCoord + 1; x++) {
        if (!(xCoord == x && yCoord == y)) {
          coords.push({x, y});
        }
      }
    }
    return coords;
  }

  generateTile(adjacentTiles: (Tile | undefined)[], isStarterMap = false): Tile {
    // Calculate the weighted percentages for each tile type
    const weightedPercentages: Map<TerrainType, number> = new Map<TerrainType, number>();

    for (const tileType of tileTypes) {
      weightedPercentages.set(tileType.type, tileType.spawnPercent);

      // Calculate the adjacency bonus
      const adjacencyBonus = this.calculateAdjacencyBonus(adjacentTiles, tileType.type);
      weightedPercentages.set(tileType.type, tileType.spawnPercent + adjacencyBonus);
    }

    // Generate a random number between 0 and totalCount
    let totalCount = 0;
    for(let key of weightedPercentages.keys()) {
      if (!isStarterMap || (key != TerrainType.Water && key != TerrainType.Mountains))
        totalCount += weightedPercentages.get(key) || 0;
    }
    const randomValue = Math.random() * totalCount;

    // Determine the tile type based on the weighted percentages
    let selectedType = null;
    let cumulativePercent = 0;

    for (let key of weightedPercentages.keys()) {
      cumulativePercent += weightedPercentages.get(key) || 0;

      if (randomValue <= cumulativePercent && (!isStarterMap || (key != TerrainType.Water && key != TerrainType.Mountains))) {
        selectedType = key;
        break;
      }
    }

    return new Tile(selectedType!);
  }

  calculateAdjacencyBonus(adjacentTiles: (Tile | undefined)[], targetType: TerrainType) {
    const adjacentOfType = adjacentTiles.filter((adjTile) => adjTile && adjTile.type === targetType)
      .length;

    // Calculate the bonus based on the number of adjacent tiles of the same type
    return (tileTypes.find(t => t.type === targetType)?.adjacencyBonusPercentage || 1) * adjacentOfType;
  }
}
