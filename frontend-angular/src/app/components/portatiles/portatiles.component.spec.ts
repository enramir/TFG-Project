import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortatilesComponent } from './portatiles.component';

describe('PortatilesComponent', () => {
  let component: PortatilesComponent;
  let fixture: ComponentFixture<PortatilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortatilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortatilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
