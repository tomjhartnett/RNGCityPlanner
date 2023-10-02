import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildBoxComponent } from './build-box.component';

describe('BuildBoxComponent', () => {
  let component: BuildBoxComponent;
  let fixture: ComponentFixture<BuildBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
