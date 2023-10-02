import { Component, OnInit } from '@angular/core';
import {CityManagerService} from "../../services/city-manager.service";

@Component({
  selector: 'app-resource-bar',
  templateUrl: './resource-bar.component.html',
  styleUrls: ['./resource-bar.component.css']
})
export class ResourceBarComponent implements OnInit {

  get availableResourcesFormatted() {
    return this.cityManagerService.availableResources.map(r => `${r.resource}: ${r.amount}`);
  }

  constructor(
    private cityManagerService: CityManagerService
  ) { }

  ngOnInit(): void {
  }

}
