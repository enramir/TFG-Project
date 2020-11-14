import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptadoresComponent } from './adaptadores.component';

describe('AdaptadoresComponent', () => {
  let component: AdaptadoresComponent;
  let fixture: ComponentFixture<AdaptadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
