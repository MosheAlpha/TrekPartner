import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreksComponent } from './treks.component';

describe('TreksComponent', () => {
  let component: TreksComponent;
  let fixture: ComponentFixture<TreksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
