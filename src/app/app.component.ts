import { Component } from '@angular/core';
import {HoverItem} from "./models/hover-item.model";
import {Building} from "./models/building.model";
import {Tile} from "./models/tile.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RNGCityPlanner';

  selectedItem?: HoverItem;

  setSelectedItem(item: Building | Tile) {
    if (item instanceof Building) {
      this.selectedItem = new HoverItem(item.name, item.image);
      this.selectedItem.cost = item.buildCostFormatted;
      this.selectedItem.input = item.inputResourcesFormatted;
      this.selectedItem.output = item.outputResourcesFormatted;
    } else {
      this.selectedItem = new HoverItem(item.terrainNameFormatted, item.image);
    }
  }
}
