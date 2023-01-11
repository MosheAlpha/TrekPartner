import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrekComponent } from './add-trek.component';

describe('AddTrekComponent', () => {
  let component: AddTrekComponent;
  let fixture: ComponentFixture<AddTrekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
