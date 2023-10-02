import { Component, OnInit } from '@angular/core';
import {CityManagerService} from "../../services/city-manager.service";
import {Building} from "../../models/building.model";

@Component({
  selector: 'app-build-box',
  templateUrl: './build-box.component.html',
  styleUrls: ['./build-box.component.css']
})
export class BuildBoxComponent implements OnInit {

  get possibleBuildings(): Building[] {
    return this.cityManagerService.possibleBuildings;
  }

  constructor(
    private cityManagerService: CityManagerService
  ) { }

  ngOnInit(): void {
  }

}
