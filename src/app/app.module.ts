import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MapViewComponent} from "./components/map-view/map-view.component";
import {HoverBoxComponent} from "./components/hover-box/hover-box.component";
import {BuildBoxComponent} from "./components/build-box/build-box.component";
import {ResourceBarComponent} from "./components/resource-bar/resource-bar.component";

@NgModule({
    declarations: [
        AppComponent,
        MapViewComponent,
        HoverBoxComponent,
        BuildBoxComponent,
        ResourceBarComponent
    ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
