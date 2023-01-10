import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekInfoComponent } from './trek-info.component';

describe('TrekInfoComponent', () => {
  let component: TrekInfoComponent;
  let fixture: ComponentFixture<TrekInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
