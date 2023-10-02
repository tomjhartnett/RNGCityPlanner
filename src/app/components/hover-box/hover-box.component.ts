import {Component, Input, OnInit} from '@angular/core';
import {HoverItem} from "../../models/hover-item.model";

@Component({
  selector: 'app-hover-box',
  templateUrl: './hover-box.component.html',
  styleUrls: ['./hover-box.component.css']
})
export class HoverBoxComponent implements OnInit {

  @Input() selectedItem?: HoverItem;

  constructor() { }

  ngOnInit(): void {
  }

}
