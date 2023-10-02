import { Injectable } from '@angular/core';
import {Building} from "../models/building.model";

@Injectable({
  providedIn: 'root'
})
export class CityManagerService {

  _possibleBuildings: Building[] = [
    new Building("HQ", [{resource: "Gold", amount: 5}, {resource: "Food", amount: 5}, {resource: "Wood", amount: 2}], [], [{resource: "Wood", amount: 100}, {resource: "Stone", amount: 100}, {resource: "Tools", amount: 50}], 'HQ'),
    new Building("House", [{resource: "Gold", amount: 1}], [{resource: "Food", amount: 1}], [{resource: "Wood", amount: 5}], 'HQ'),
    new Building("Farm", [{resource: "Food", amount: 1}], [], [{resource: "Wood", amount: 2}], 'HQ'),
    new Building("Sawmill", [{resource: "Wood", amount: 1}], [{resource: "Gold", amount: 1}], [{resource: "Wood", amount: 5}, {resource: "Gold", amount: 1}], 'HQ'),
    new Building("Stone Quarry", [{resource: "Stone", amount: 1}], [{resource: "Wood", amount: 1}], [{resource: "Wood", amount: 10}], 'HQ'),
    new Building("Iron Mine", [{resource: "Iron", amount: 1}], [{resource: "Wood", amount: 1}], [{resource: "Wood", amount: 10}, {resource: "Stone", amount: 10}], 'HQ'),
    new Building("Tool Workshop", [{resource: "Tools", amount: 1}], [{resource: "Iron", amount: 1}, {resource: "Wood", amount: 1}], [{resource: "Wood", amount: 10}, {resource: "Stone", amount: 10}, {resource: "Iron", amount: 5}], 'HQ'),
    new Building("Weapon Workshop", [{resource: "Weapons", amount: 1}], [{resource: "Iron", amount: 1}, {resource: "Wood", amount: 1}], [{resource: "Wood", amount: 10}, {resource: "Stone", amount: 10}, {resource: "Iron", amount: 5}], 'HQ')
  ];

  _availableResources: {resource: string, amount: number}[] = [
    {resource: "Gold", amount: 0},
    {resource: "Food", amount: 200},
    {resource: "Wood", amount: 150},
    {resource: "Stone", amount: 0},
    {resource: "Iron", amount: 0},
    {resource: "Tools", amount: 50},
    {resource: "Weapons", amount: 0}
  ];

  get possibleBuildings(): Building[] {
    return this._possibleBuildings;
  }

  get availableResources(): {resource: string, amount: number}[] {
    return this._availableResources;
  }

  constructor() {

  }

  canAfford(building: Building): boolean {
    return this.hasResources(building.buildCost);
  }

  hasResources(resources: {resource: string, amount: number}[]) {
    for(let resource of resources) {
      try {
        if(this._availableResources.find(r => r.resource == resource.resource)!.amount < resource.amount)
          return false;
      } catch (error) {
        console.log(`Missing initialized resource: ${resource.resource}. `, error);
      }
    }
    return true;
  }

  addResources(resources: {resource: string, amount: number}[]) {
    resources.forEach(resource => {
      try {
        this._availableResources.find(r => r.resource == resource.resource)!.amount += resource.amount;
      } catch (error) {
        console.log(`Missing initialized resource: ${resource.resource}. `, error);
      }
    });
  }

  removeResources(resources: {resource: string, amount: number}[]): boolean {
    if(!this.hasResources(resources)) {
      return false;
    }

    resources.forEach(resource => {
      try {
        this._availableResources.find(r => r.resource == resource.resource)!.amount += resource.amount;
      } catch (error) {
        console.log(`Missing initialized resource: ${resource.resource}. `, error);
      }
    });
    return true;
  }
}
