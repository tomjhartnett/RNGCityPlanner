import { Component, OnInit } from '@angular/core';
import {MapManagerService} from "../../services/map-manager.service";
import {Tile} from "../../models/tile.model";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  get map(): Map<{x: number, y: number}, Tile> {
    return this.mapManagerService.map;
  }

  // +1 for array indexing and +2 to add a grey border
  get maxXArray() {
    return [...Array(this._maxXandOffset.maxX+3).keys()];
  }
  get maxYArray() {
    return [...Array(this._maxYandOffset.maxY+3).keys()];
  }
  // +1 for array indexing
  get xOffset() {
    return this._maxXandOffset.offset+1;
  }
  get yOffset() {
    return this._maxYandOffset.offset+1;
  }

  get _maxXandOffset(): {maxX: number, offset: number} {
    // declared to verify update
    let keys = this.map.keys();
    let maxX = 0;
    let mixX = 0;
    for(let key of keys) {
      if(key.x < mixX)
        mixX = key.x;
      if(key.x > maxX)
        maxX = key.x;
    }
    return {maxX: maxX + mixX, offset: mixX};
  }

  get _maxYandOffset(): {maxY: number, offset: number} {
    // declared to verify update
    let keys = this.map.keys();
    let maxY = 0;
    let mixY = 0;
    for(let key of keys) {
      if(key.y < mixY)
        mixY = key.y;
      if(key.y > maxY)
        maxY = key.y;
    }
    return {maxY: maxY + mixY, offset: mixY};
  }

  constructor(
    private mapManagerService: MapManagerService
  ) {}

  ngOnInit(): void {
  }
}
