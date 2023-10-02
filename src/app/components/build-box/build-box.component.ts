import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CityManagerService} from "../../services/city-manager.service";
import {Building} from "../../models/building.model";

@Component({
  selector: 'app-build-box',
  templateUrl: './build-box.component.html',
  styleUrls: ['./build-box.component.css']
})
export class BuildBoxComponent implements OnInit {

  @Output() hover: EventEmitter<Building> = new EventEmitter();

  get possibleBuildings(): Building[] {
    return this.cityManagerService.possibleBuildings;
  }

  get affordableBuildings(): Building[] {
    return this.possibleBuildings.filter(b => this.cityManagerService.hasResources(b.buildCost));
  }

  constructor(
    private cityManagerService: CityManagerService
  ) { }

  ngOnInit(): void {
  }

  emitHoverItem(item: Building) {
    this.hover.emit(item);
  }
}
